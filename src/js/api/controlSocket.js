import * as Interpretor from "./interpretor";
import {flatbuffers} from "flatbuffers"

class ControlSocket {
	constructor() {
		let url;
		if(location.protocol=="http:") {
			url = "ws://"+location.host+"/control";
		}
		else if(location.protocol=="https:") {
			url = "wss://"+location.host+"/control";
		}

		this.socket = new WebSocket(url);
		this.socket.binaryType = "arraybuffer";
	}

	sendStreamBroadcastMsg(sId, eId) {
		return new Promise((resolve, reject) => {
			const msg = Interpretor.getStreamBroadCastMessage(sId, eId);
			this._send(msg);
			this.socket.onmessage = (e) => {
				var buf = new flatbuffers.ByteBuffer(e.data);
				var streamResponse = message.StreamResponse.getRootAsStreamResponse(buf);
				if(streamResponse.status() === message.Status.OK) {
					resolve(streamResponse.status());
				} else {
					reject(streamResponse.status());
				}
			}
		});
	}

	setOnMessage(cb) {
		this.socket.onmessage = cb;
	}

	setOnClose(cb) {
		this.socket.onclose = cb;
	}

	getOnMessage() {
		return this.socket.onmessage;
	}

	getOnClose() {
		return this.socket.onclose;
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
