import * as Interpretor from "./interpretor";
import {flatbuffers} from "flatbuffers";
import * as message from ".././fbs/stream"
import store from "../store/store";
import { addComment, setStreamInfo, setStreamActiveCount } from "../actions/actions";
import Long from "long"

class ControlSocket {
	constructor() {
		if(location.protocol=="http:") {
			this.url = "ws://"+location.host+"/control";
		}
		else if(location.protocol=="https:") {
			this.url = "wss://"+location.host+"/control";
		}
	}

	initPublishing(sId, eId) {
		if (!this.socket) {
			this._initSocket();
		}

		if (this.socket.onmessage) {
			this.socket.onmessage = null;
		}

		return this._sendStreamBroadcastMsg(sId, eId);
	}

	publish(arr, sId, eId) {
		this._sendStreamFrameMsg(arr, sId, eId);
	}

	handlePublish(e) {
		const buf = new flatbuffers.ByteBuffer(new Uint8Array(e.data));
		const msg = message.StreamMessage.getRootAsStreamMessage(buf);
		switch (msg.messageType()) {
			case message.Message.Comment:
				const commentMsg = msg.message(new message.Comment());
				const cmt = {
					username: commentMsg.userName(),
					text: commentMsg.text()
				}
				store.dispatch(addComment(cmt));
				break;
			case message.Message.ActiveListeners:
				const actCntMsg = msg.message(new message.ActiveListeners());
				const act = actCntMsg.activeListeners();
				store.dispatch(setStreamActiveCount(act));
				break;
			default:
				console.error(`Unhandled message type in publish: ${msg.messageType()}`);
		}
	}

	stopPublishing(sId, eId) {
		this._sendStreamStopMsg(sId, eId);
	}

	subscribe(sId, eId, audioCallback) {
		if (!this.socket) {
			this._initSocket();
		}

		if (this.socket.onmessage) {
			this.socket.onmessage = null;
		}

		this._sendStreamSubscribeMsg(sId, eId, audioCallback)
	}

	unsubscribe(sId, eId) {
		this._sendStreamUnsubscribeMsg(sId, eId);
		this.socket.onmessage = this.handleSubscribe.bind(this, null)
	}

	handleSubscribe(audioCallback, e) {
		const buf = new flatbuffers.ByteBuffer(new Uint8Array(e.data));
		const msg = message.StreamMessage.getRootAsStreamMessage(buf);
		switch (msg.messageType()) {
			case message.Message.Frame:
				// printMsgLag(msg);
				const frame = msg.message(new message.Frame());
				if (audioCallback) {
					audioCallback(frame);
				}
				break;
			case message.Message.Comment:
				const commentMsg = msg.message(new message.Comment());
				const cmt = {
					username: commentMsg.userName(),
					text: commentMsg.text()
				}
				store.dispatch(addComment(cmt));
				break;
			case message.Message.Status:
				const statusMsg = msg.message(new message.Status());
				store.dispatch(setStreamInfo(statusMsg.status(), statusMsg.subscribeCount()));
				break;
			case message.Message.Stop:
				const stopMsg = msg.message(new message.Stop());
				// store.dispatch(setStreamInfo(statusMsg.status(), statusMsg.subscribeCount()));
				break;
			case message.Message.ActiveListeners:
				const actCntMsg = msg.message(new message.ActiveListeners());
				const act = actCntMsg.activeListeners();
				store.dispatch(setStreamActiveCount(act));
				break;
			default:
				console.error(`Unhandled message type in subscribe: ${msg.messageType()}`);
		}
	}

	sendComment(sId, eId, username, comment) {
		this._sendStreamCommentMsg(sId, eId, username, comment);
	}

	_sendStreamBroadcastMsg(sId, eId) {
		return new Promise((resolve, reject) => {
			this.socket.onmessage = (e) => {
				var buf = new flatbuffers.ByteBuffer(new Uint8Array(e.data));
				const msg = message.StreamMessage.getRootAsStreamMessage(buf);

				if (msg.messageType() === message.Message.Response) {
					const response = msg.message(new message.Response());

					if (response.status() === message.ResponseStatus.OK) {
						resolve(response.status());
						this.socket.onmessage = this.handlePublish;
					} else {
						reject(response.status());
						this.socket.onmessage = null;
					}
				} else {
					console.error(`Unhandled message type in StreamBroadCast response: ${msg.messageType()}`);
					this.socket.onmessage = null;
				}
			}

			const msg = Interpretor.getBroadCastMessage(sId, eId);
			this._send(msg);
		});
	}

	_sendStreamFrameMsg(arr, sId, eId) {
		const msg = Interpretor.getFrameMessage(arr, sId, eId);
		this._send(msg);
	}

	_sendStreamStopMsg(sId, eId) {
		const msg = Interpretor.getStopMessage(sId, eId);
		this._send(msg);
	}

	_sendStreamSubscribeMsg(sId, eId, audioCallback) {
		return new Promise((resolve, reject) => {
			this.socket.onmessage = (e) => {
				var buf = new flatbuffers.ByteBuffer(new Uint8Array(e.data));
				const msg = message.StreamMessage.getRootAsStreamMessage(buf);

				if (msg.messageType() === message.Message.Response) {
					const response = msg.message(new message.Response());

					if (response.status() === message.ResponseStatus.OK) {
						resolve(response.status());
						this.socket.onmessage = this.handleSubscribe.bind(this, audioCallback);
					} else {
						reject(response.status());
						this.socket.onmessage = null;
					}
				} else {
					console.error(`Unhandled message type in StreamSubscribe response: ${msg.messageType()}`);
					this.socket.onmessage = null;
				}

			}

			const msg = Interpretor.getSubscribeMessage(sId, eId);
			this._send(msg);
		});
	}

	_sendStreamUnsubscribeMsg(sId, eId) {
		const msg = Interpretor.getUnsubscribeMessage(sId, eId);
		this._send(msg);
	}

	_sendStreamCommentMsg(sId, eId, username, comment) {
		const msg = Interpretor.getCommentMessage(sId, eId, username, comment);
		this._send(msg);
	}

	_initSocket() {
		this.socket = new WebSocket(this.url);
		this.socket.binaryType = "arraybuffer";
		this.socket.onclose = (e) => {
			this.socket = null;
		}
	}

	_closeSocket() {
		console.log("_closeSocket");
		this.socket.onclose = null;
		this.socket.close();
		this.socket = null;
	}

	_send(packet) {
		if (this.socket.readyState == WebSocket.OPEN) {
			this.socket.send(packet);
		} else if (this.socket.readyState == WebSocket.CONNECTING) {
			const _onopen = this.socket.onopen;
			this.socket.onopen = () => {
				if (_onopen) {
					_onopen();
				}
				this.socket.send(packet);
			}
		} else {
			console.error('Socket is in CLOSED state');
		}
	}
}

const printMsgLag = (msg) => {
	const ts = msg.timestamp();
	const tsLong = new Long(ts.low, ts.high);
	// console.log("tsLong", tsLong.toNumber());
	// console.log("Date", new Date().getTime());
	console.log(new Date().getTime() - tsLong.toNumber());
}

const cs = new ControlSocket();

export default cs;
