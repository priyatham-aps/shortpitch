import * as Interpretor from "./interpretor";
import {flatbuffers} from "flatbuffers";
import * as message from ".././fbs/stream"
import store from "../store/store";
import { addComment } from "../actions/actions";

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
			case message.Message.StreamComment:
				const streamComment = msg.message(new message.StreamComment());
				const cmt = {
					username: streamComment.userName(),
					text: streamComment.text()
				}
				store.dispatch(addComment(cmt));
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

		this._sendStreamSubscribeMsg(sId, eId)
		.then(() => {
			this.handleSubscribe(audioCallback);
		});
	}

	unsubscribe(sId, eId) {
		this._sendStreamUnsubscribeMsg(sId, eId);
		this.handleSubscribe(null);
	}

	handleSubscribe(audioCallback) {
		this.socket.onmessage = (e) => {
			const buf = new flatbuffers.ByteBuffer(new Uint8Array(e.data));
			const msg = message.StreamMessage.getRootAsStreamMessage(buf);
			switch (msg.messageType()) {
				case message.Message.StreamFrame:
					const streamFrame = msg.message(new message.StreamFrame());
					if (audioCallback) {
						audioCallback(streamFrame);
					}
					break;
				case message.Message.StreamComment:
					const streamComment = msg.message(new message.StreamComment());
					const cmt = {
						username: streamComment.userName(),
						text: streamComment.text()
					}
					store.dispatch(addComment(cmt));
					break;
				default:
					console.error(`Unhandled message type in subscribe: ${msg.messageType()}`);
			}
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

				if (msg.messageType() === message.Message.StreamResponse) {
					const streamResponse = msg.message(new message.StreamResponse());

					if (streamResponse.status() === message.ResponseStatus.OK) {
						resolve(streamResponse.status());
						this.socket.onmessage = this.handlePublish;
					} else {
						reject(streamResponse.status());
						this.socket.onmessage = null;
					}
				} else {
					console.error(`Unhandled message type in StreamBroadCast response: ${msg.messageType()}`);
					this.socket.onmessage = null;
				}
			}

			const msg = Interpretor.getStreamBroadCastMessage(sId, eId);
			this._send(msg);
		});
	}

	_sendStreamFrameMsg(arr, sId, eId) {
		const msg = Interpretor.getStreamFrameMessage(arr, sId, eId);
		this._send(msg);
	}

	_sendStreamStopMsg(sId, eId) {
		const msg = Interpretor.getStreamStopMessage(sId, eId);
		this._send(msg);
	}

	_sendStreamSubscribeMsg(sId, eId) {
		return new Promise((resolve, reject) => {
			this.socket.onmessage = (e) => {
				var buf = new flatbuffers.ByteBuffer(new Uint8Array(e.data));
				const msg = message.StreamMessage.getRootAsStreamMessage(buf);

				if (msg.messageType() === message.Message.StreamResponse) {
					const streamResponse = msg.message(new message.StreamResponse());

					if (streamResponse.status() === message.ResponseStatus.OK) {
						resolve(streamResponse.status());
					} else {
						reject(streamResponse.status());
					}
				} else {
					console.error(`Unhandled message type in StreamSubscribe response: ${msg.messageType()}`);
				}

				this.socket.onmessage = null;
			}

			const msg = Interpretor.getStreamSubscribeMessage(sId, eId);
			this._send(msg);
		});
	}

	_sendStreamUnsubscribeMsg(sId, eId) {
		const msg = Interpretor.getStreamUnsubscribeMessage(sId, eId);
		this._send(msg);
	}

	_sendStreamCommentMsg(sId, eId, username, comment) {
		const msg = Interpretor.getStreamCommentMessage(sId, eId, username, comment);
		this._send(msg);
	}

	_initSocket() {
		this.socket = new WebSocket(this.url);
		this.socket.binaryType = "arraybuffer";
	}

	_closeSocket() {
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

const cs = new ControlSocket();

export default cs;
