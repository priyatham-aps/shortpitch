import AudioContext from "./audioContext"
import {defaultConfig} from '../globals';
import Resampler from './resampler';
import {OpusEncoder} from './opus';
import ControlSocket from "../api/controlSocket";
import * as Interpretor from "../api/interpretor";
import {flatbuffers} from "flatbuffers";
import * as message from ".././fbs/stream"

class Streamer {
	constructor(config) {
		navigator.getUserMedia = (navigator.getUserMedia ||
				navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia ||
				navigator.msGetUserMedia);

		this.config = {};
		this.config.codec = this.config.codec || defaultConfig.codec;
		this.sampler = new Resampler(48000, this.config.codec.sampleRate, 1, this.config.codec.bufferSize);
		this.encoder = new OpusEncoder(this.config.codec.sampleRate, this.config.codec.channels, this.config.codec.app, this.config.codec.frameDuration);
	}

	start(streamId, eventId, onError) {
		ControlSocket.initPublishing(streamId, eventId)
		.then((status) => {
			this._makeStream(streamId, eventId, onError);
		});
	}

	stop(streamId, eventId) {
		if (this.audioInput) {
			this.audioInput.disconnect();
			this.audioInput = null;
		}
		if (this.gainNode) {
			this.gainNode.disconnect();
			this.gainNode = null;
		}
		if (this.recorder) {
			this.recorder.disconnect();
			this.recorder = null;
		}
		if (this.stream) {
			this.stream.getTracks()[0].stop()
		}
		ControlSocket.stopPublishing(streamId, eventId);
	}

	mute() {
		this.gainNode.gain.value = 0;
		console.log('Mic muted');
	}

	unMute() {
		this.gainNode.gain.value = 1;
		console.log('Mic unmuted');
	}

	_makeStream(streamId, eventId, onError) {
		const config = { audio: true }
		navigator.getUserMedia(config, (stream) => {
			this.stream = stream;
			this.audioInput = AudioContext.createMediaStreamSource(stream);
			this.gainNode = AudioContext.createGain();
			this.recorder = AudioContext.createScriptProcessor(this.config.codec.bufferSize, 1, 1);
			this.recorder.onaudioprocess = (e) => {
				var left = e.inputBuffer.getChannelData(0);
				var resampled = this.sampler.resampler(e.inputBuffer.getChannelData(0));
				var packets = this.encoder.encode_float(resampled);
				for (var i = 0; i < packets.length; i++) {
					var intArray = new Uint8Array(packets[i])
					ControlSocket.publish(intArray, streamId, eventId);

					// uncomment this for without controlsocket
					// const msg = Interpretor.getFrameMessage(intArray, streamId, eventId);
					// if (this.socket.readyState == 1) this.socket.send(msg);
				}
				//var resampled = this.sampler.resampler(left);
				//this.socket.send(this._convertFloat32ToInt16(resampled))
			};
			this.audioInput.connect(this.gainNode);
			this.gainNode.connect(this.recorder);
			this.recorder.connect(AudioContext.destination);
		}, onError || this._onError);
	}

	_onError(e) {
		const error = new Error(e.name);
		error.name = 'NavigatorUserMediaError';
		throw error;
	}

	_convertFloat32ToInt16(buffer) {
		let l = buffer.length;
		const buf = new Int16Array(l);
		while (l--) {
			buf[l] = Math.min(1, buffer[l])*0x7FFF;
		}
		return buf.buffer;
	}
}

const streamer = new Streamer(defaultConfig);

export default streamer;
