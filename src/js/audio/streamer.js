import {defaultConfig} from '../globals' 
import Resampler from './resampler'
import {OpusEncoder} from './opus'
import * as interpretor from './interpretor'
import {flatbuffers} from "flatbuffers"
import * as message from ".././fbs/stream"
import {ControlSocket} from './controlSocket'

const audioContext = new(window.AudioContext || window.webkitAudioContext)();
const builder = new flatbuffers.Builder(1024)


export default class Streamer {
	constructor(config, streamId,eventId) {
		navigator.getUserMedia = (navigator.getUserMedia ||
				navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia ||
				navigator.msGetUserMedia);

		this.config = {};
		this.config.codec = this.config.codec || defaultConfig.codec;
		this.streamId = streamId;
		this.eventId = eventId;
		this.sampler = new Resampler(audioContext.sampleRate, this.config.codec.sampleRate, 1, this.config.codec.bufferSize);
		this.encoder = new OpusEncoder(this.config.codec.sampleRate, this.config.codec.channels, this.config.codec.app, this.config.codec.frameDuration);
		this.controlSocket = ControlSocket()
		
	}

	start(streamId,eventId, onError) {
		streamId = streamId || this.streamId;
		eventId = eventId || this.eventId;
		let socketUrl
		if(location.protocol=="http:"){
			socketUrl = "ws://"+location.host+"/stream/ws/publish/"+streamId
		}
		else if(location.protocol=="https:"){
			socketUrl = "wss://"+location.host+"/stream/ws/publish/"+streamId
		}
		//socketUrl = "ws://"+location.host+"/control"
		this.socket = this.controlSocket.connect()
		this.socket.binaryType = 'arraybuffer';

		if (this.socket.readyState == WebSocket.OPEN) {
			//this._makeStream(onError);
		} else if (this.socket.readyState == WebSocket.CONNECTING) {
			const _onopen = this.socket.onopen;
			this.socket.onopen = () => {
				if (_onopen) {
					_onopen();
				}
				this.socket.send(interpretor.getStreamBroadCastMessage(builder,streamId,eventId));
				
			}
		} else {
			console.error('Socket is in CLOSED state');
		}
		this.socket.onmessage = (response) => {
        	var bytes = response;
        	console.log(response)
        	var buf = new flatbuffers.ByteBuffer(bytes);
        	var streamResponse = message.StreamResponse.getRootAsStreamResponse(buf);
        	if(streamResponse.status()==message.Status.OK){
        		this._makeStream(onError);
        	}
        };

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
		if(this.stream){
			this.stream.getTracks()[0].stop()
		}
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
	sendBroadcast(){

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
				 	//if (this.socket.readyState == 1) this.socket.send(packets[i]);
				 	var intArray = new Uint8Array(packets[i])
					//if (this.socket.readyState == 1) this.socket.send(interpretor.getStreamFrameMessage(builder,intArray,this.streamId,this.eventId));
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
