import {defaultConfig} from '../globals'
import Resampler from './resampler'
import {OpusDecoder} from './opus'


const audioContext = new(window.AudioContext || window.webkitAudioContext)();

export default class Player {
	constructor(streamId) {
		this.config = {};
		this.config.codec = this.config.codec || defaultConfig.codec;
		this.streamId = streamId;
		this.silence = new Float32Array(this.config.codec.bufferSize);
		this.sampler = new Resampler(this.config.codec.sampleRate, audioContext.sampleRate, 1, this.config.codec.bufferSize);
		// Opus Decoding
		this.decoder =  new OpusDecoder(this.config.codec.sampleRate, this.config.codec.channels);
		this.scriptNode = audioContext.createScriptProcessor(this.config.codec.bufferSize, 1, 1);
		this.gainNode = audioContext.createGain();
	}

	start(streamId) {
		streamId = streamId || this.streamId;
		let socketUrl

		if(location.protocol=="http:"){
			socketUrl = "ws://"+location.host+"/stream/ws/subscribe/"+streamId
		}
		else if(location.protocol=="https:"){
			socketUrl = "wss://"+location.host+"/stream/ws/subscribe/"+streamId
		}
		var _this = this;

		this.audioQueue = {
			buffer: new Float32Array(0),

			write: function(newAudio) {
				var currentQLength = this.buffer.length;
				newAudio = _this.sampler.resampler(newAudio);
				var newBuffer = new Float32Array(currentQLength + newAudio.length);
				newBuffer.set(this.buffer, 0);
				newBuffer.set(newAudio, currentQLength);
				this.buffer = newBuffer;
			},

			read: function(nSamples) {
				var samplesToPlay = this.buffer.subarray(0, nSamples);
				this.buffer = this.buffer.subarray(nSamples, this.buffer.length);
				return samplesToPlay;
			},

			length: function() {
				return this.buffer.length;
			}
		};

		this.scriptNode.onaudioprocess = function(e) {
			if (_this.audioQueue.length()) {
				e.outputBuffer.getChannelData(0).set(_this.audioQueue.read(_this.config.codec.bufferSize));
			} else {
				e.outputBuffer.getChannelData(0).set(_this.silence);
			}
		};
		this.scriptNode.connect(this.gainNode);
		this.gainNode.connect(audioContext.destination);

		if (!this.parentSocket) {
			this.socket = this.socket || new WebSocket(socketUrl)
		} else {
			this.socket = this.parentSocket;
		}
        var _onmessage = this.parentOnmessage = this.socket.onmessage;
        this.socket.onmessage = function(message) {
        	if (_onmessage) {
        		_onmessage(message);
        	}
        	if (message.data instanceof Blob) {
        		var reader = new FileReader();
        		reader.onload = function(event) {
        			//Opus Decoding
        			_this.audioQueue.write(_this.decoder.decode_float(reader.result));
        		};
        		reader.readAsArrayBuffer(message.data);
        	}
        };
	}

	stop() {
		this.audioQueue = null;
      	this.scriptNode.disconnect();
      	this.scriptNode = null;
      	this.gainNode.disconnect();
      	this.gainNode = null;

      	if(this.socket){
	      	 if (!this.parentSocket) {
	      		this.socket.close();
	      	} else {
	      		this.socket.onmessage = this.parentOnmessage;
	      	}
	     }
	}
	
}
