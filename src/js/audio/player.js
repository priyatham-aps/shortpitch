import AudioContext from "./audioContext"
import Resampler from './resampler'
import {OpusDecoder} from './opus'
import {defaultConfig} from '../globals'
import ControlSocket from "../api/controlSocket";

class Player {
	constructor(config) {
		this.config = config || {};
		this.config.codec = this.config.codec || defaultConfig.codec;
		this.silence = new Float32Array(this.config.codec.bufferSize);
		this.sampler = new Resampler(this.config.codec.sampleRate, AudioContext.sampleRate, 1, this.config.codec.bufferSize);
		// Opus Decoding
		this.decoder =  new OpusDecoder(this.config.codec.sampleRate, this.config.codec.channels);
		this.scriptNode = AudioContext.createScriptProcessor(this.config.codec.bufferSize, 1, 1);
		this.gainNode = AudioContext.createGain();
	}

	start(streamId, eventId) {
		// const socketUrl = "ws://"+location.host+"/stream/ws/subscribe/"+streamId;
		// this.socket = new WebSocket(socketUrl);

		this.audioQueue = new AudioQueue(this.sampler);

		this.scriptNode.onaudioprocess = (e) => {
			if (this.audioQueue.length()) {
				e.outputBuffer.getChannelData(0).set(this.audioQueue.read(this.config.codec.bufferSize));
			} else {
				e.outputBuffer.getChannelData(0).set(this.silence);
			}
		};

		this.scriptNode.connect(this.gainNode);
		this.gainNode.connect(AudioContext.destination);

		ControlSocket.sendStreamSubscribeMsg(streamId, eventId)
		.then((status) => console.log(status));

		// ControlSocket.onListenStreamFrameMsg()
		// .then((streamFrame) => {
		// 	this.audioQueue.write(this.decoder.decode_float(streamFrame));
		// });
		// var _onmessage = this.parentOnmessage = this.socket.onmessage;
		// this.socket.onmessage = (message) => {
		// 	if (_onmessage) {
		// 		_onmessage(message);
		// 	}
		// 	if (message.data instanceof Blob) {
		// 		console.log("Blob");
		// 		var reader = new FileReader();
		// 		reader.onload = (event) => {
		// 			//Opus Decoding
		// 			this.audioQueue.write(this.decoder.decode_float(reader.result));
		// 		};
		// 		reader.readAsArrayBuffer(message.data);
		// 	} else {
		// 		console.log("ArrayBuffer");
		// 		var buf = new flatbuffers.ByteBuffer(e.data);
		// 		var streamFrame = message.StreamFrame.getRootAsStreamFrame(buf);
		// 		this.audioQueue.write(this.decoder.decode_float(streamFrame.frame()));
		// 	}
		// };
	}

	stop() {
		this.audioQueue = null;
		this.scriptNode.disconnect();
		this.gainNode.disconnect();
		if(this.socket){
			if (!this.parentSocket) {
				this.socket.close();
				this.socket=null;
			} else {
				this.socket.onmessage = this.parentOnmessage;
			}
		}
	}
}

class AudioQueue {
	constructor(sampler) {
		this.buffer = new Float32Array(0);
		this.sampler = sampler;
	}

	write(newAudio) {
		const currentQLength = this.buffer.length;
		newAudio = this.sampler.resampler(newAudio);
		const newBuffer = new Float32Array(currentQLength + newAudio.length);
		newBuffer.set(this.buffer, 0);
		newBuffer.set(newAudio, currentQLength);
		this.buffer = newBuffer;
	}

	read(nSamples) {
		const samplesToPlay = this.buffer.subarray(0, nSamples);
		this.buffer = this.buffer.subarray(nSamples, this.buffer.length);
		return samplesToPlay;
	}

	length() {
		return this.buffer.length;
	}
}

const player = new Player(defaultConfig);

export default player;
