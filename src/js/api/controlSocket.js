import * as Interpretor from "./interpretor";
import {flatbuffers} from "flatbuffers";
import * as message from ".././fbs/stream"
import store from "../store/store";

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


	}

	sendStreamBroadcastMsg(sId, eId) {
		return new Promise((resolve, reject) => {
			const msg = Interpretor.getStreamBroadCastMessage(sId, eId);
			this._send(msg);
			this.socket.onmessage = (e) => {
				var buf = new flatbuffers.ByteBuffer(e.data);
				var streamResponse = message.StreamResponse.getRootAsStreamResponse(buf);
				console.log(streamResponse);
				if(streamResponse.status() === message.Status.OK) {
					resolve(streamResponse.status());
				} else {
					reject(streamResponse.status());
				}
			}
		});
	}

	sendStreamFrameMsg(arr, sId, eId) {
		const msg = Interpretor.getStreamFrameMessage(arr, sId, eId);
		this._send(msg);
	}

	sendStreamStopMsg(sId, eId) {
		const msg = Interpretor.getStreamStopMessage(sId, eId);
		this._send(msg);
	}

	sendStreamSubscribeMsg(sId, eId) {
		return new Promise((resolve, reject) => {
			const msg = Interpretor.getStreamSubscribeMessage(sId, eId);
			this._send(msg);
			this.socket.onmessage = (e) => {
				var buf = new flatbuffers.ByteBuffer(e.data);
				var streamResponse = message.StreamResponse.getRootAsStreamResponse(buf);
				console.log(streamResponse);
				if(streamResponse.status() === message.Status.OK) {
					resolve(streamResponse.status());
					this.socket.onmessage = () => {};
				} else {
					reject(streamResponse.status());
					this.socket.onmessage = () => {};
				}
			}
		});
	}

	onListenStreamFrameMsg() {
		return new Promise((resolve, reject) => {
			this.socket.onmessage = (e) => {
				var buf = new flatbuffers.ByteBuffer(e.data);
				var msg = message.StreamMessage.getRootAsStreamMessage(buf);
				resolve(msg);
			}
		});
	}

	onPublish() {
		this.socket.onmessage = (e) => {
			var buf = new flatbuffers.ByteBuffer(e.data);
			var msg = message.StreamMessage.getRootAsStreamMessage(buf);
			switch (msg.messageType()) {
				case message.Message.StreamComment:
					const cmt = msg.message();
					store.dispatch(addComment(cmt));
					break;
				default:
					console.error(`Unhandled message type in publish: ${msg.messageType()}`);
			}
		}
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
