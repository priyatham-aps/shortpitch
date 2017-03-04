import {defaultConfig} from '../globals'
import Resampler from './resampler'
import {OpusEncoder} from './opus'

const audioContext = new(window.AudioContext || window.webkitAudioContext)();

export default class Streamer {
	constructor(config, streamId) {
		navigator.getUserMedia = (navigator.getUserMedia ||
				navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia ||
				navigator.msGetUserMedia);

		this.config = {};
		this.config.codec = this.config.codec || defaultConfig.codec;
		this.streamId = streamId;
		this.sampler = new Resampler(audioContext.sampleRate, this.config.codec.sampleRate, 1, this.config.codec.bufferSize);
		this.encoder = new OpusEncoder(this.config.codec.sampleRate, this.config.codec.channels, this.config.codec.app, this.config.codec.frameDuration);
	}

	start(streamId, onError) {
		streamId = streamId || this.streamId;
		let socketUrl

		if(location.protocol=="http:"){
			socketUrl = "ws://"+location.host+"/stream/ws/publish/"+streamId
		}
		else if(location.protocol=="https:"){
			socketUrl = "wss://"+location.host+"/stream/ws/publish/"+streamId
		}
		this.socket = new WebSocket(socketUrl)

		this.socket.binaryType = 'arraybuffer';

		if (this.socket.readyState == WebSocket.OPEN) {
			this._makeStream(onError);
		} else if (this.socket.readyState == WebSocket.CONNECTING) {
			const _onopen = this.socket.onopen;
			this.socket.onopen = () => {
				if (_onopen) {
					_onopen();
				}
				this._makeStream(onError);
			}
		} else {
			console.error('Socket is in CLOSED state');
		}

		const _onclose = this.socket.onclose;
		this.socket.onclose = () => {
			if (_onclose) {
				_onclose();
			}
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
			if (this.stream){
				this.stream.getTracks()[0].stop();
			} 

			console.log('Disconnected from server');
		};
	}

	stop() {
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
		this.stream.getTracks()[0].stop()

		if (this.socket) {
			this.socket.close();
			this.socket = null;
		}
	}

	mute() {
		this.gainNode.gain.value = 0;
		console.log('Mic muted');
	}

	unMute() {
		this.gainNode.gain.value = 1;
		console.log('Mic unmuted');
	}

	_makeStream(onError) {
		const config = { audio: true }
		navigator.getUserMedia(config, (stream) => {
			this.stream = stream;
			this.audioInput = audioContext.createMediaStreamSource(stream);
			this.gainNode = audioContext.createGain();
			this.recorder = audioContext.createScriptProcessor(this.config.codec.bufferSize, 1, 1);
			this.recorder.onaudioprocess = (e) => {
				var left = e.inputBuffer.getChannelData(0);
				 var resampled = this.sampler.resampler(e.inputBuffer.getChannelData(0));
				 var packets = this.encoder.encode_float(resampled);
				 for (var i = 0; i < packets.length; i++) {
				 	if (this.socket.readyState == 1) this.socket.send(packets[i]);
				 }
				//var resampled = this.sampler.resampler(left);
				//this.socket.send(this._convertFloat32ToInt16(resampled))
			};
			this.audioInput.connect(this.gainNode);
			this.gainNode.connect(this.recorder);
			this.recorder.connect(audioContext.destination);
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
