const API_HTTP_SERVER_URL = "http://localhost:8000/"
const API_WS_SERVER_URL = "ws://localhost:8000/"
const CREATE_STREAM_API_URL = API_HTTP_SERVER_URL + "api/stream/"

let pubStreamUrl = ""
let subStreamUrl = ""
let trasportStreamUrl = ""
let socket
let AudioCtx = window.AudioContext
let context = new AudioCtx();

function createStream() {
	let request = new XMLHttpRequest();
	request.open("POST", CREATE_STREAM_API_URL, true);
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
			resp = JSON.parse(request.responseText)
			pubStreamUrl = API_WS_SERVER_URL + "stream/publish/" + resp.data.id + "/"
			subStreamUrl = resp.data.subscribe_url
			trasportStreamUrl = resp.data.transport_url
			document.getElementById("subscribe_url").innerHTML = subStreamUrl
		}
	}
	request.send();
}

function pubStream(e) {
	if (pubStreamUrl == "") {
		alert("Create stream first!");
		return;
	}

	socket = new WebSocket(pubStreamUrl)

	let session = {
		audio: true,
		video: false
	};

	navigator.getUserMedia(session, initializeRecorder, onError);
}

function initializeRecorder(stream) {
	let input = context.createMediaStreamSource(stream);
	let recorder = context.createScriptProcessor(1024,1,1);

	 recorder.onaudioprocess = recorderProcess;

	input.connect(recorder);
	recorder.connect(context.destination);
}

function onError(err) {
	console.log(err)
}
function convertFloat32ToInt16(buffer) {
	l = buffer.length;
	buf = new Int16Array(l);
	while (l--) {
		buf[l] = Math.min(1, buffer[l])*0x7FFF;
	}
	return buf.buffer;
}

function recorderProcess(e) {
	  var left = e.inputBuffer.getChannelData(0);
	  //var source = context.createBufferSource();
	  // set the buffer in the AudioBufferSourceNode
	  //source.buffer = e.inputBuffer;
	  // connect the AudioBufferSourceNode to the
	  // destination so we can hear the sound
	  //source.connect(context.destination);
	  // start the source playing
	 // source.start();
	  socket.send(convertFloat32ToInt16(left))
}

function stopPubStream(e) {
	if (socket !== null && socket !== undefined) {
		socket.close()
		socket = null
	}


}
