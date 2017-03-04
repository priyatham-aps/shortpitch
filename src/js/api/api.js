import store from "../store/store"
import {setStreamId} from "../actions/actions"

const POST = "POST";
const GET = "GET";

export const CreateStream = () => {
	let url = "/api/stream/"
	let request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
			let resp = JSON.parse(request.responseText);
			store.dispatch(setStreamId(resp.id));
		}
	}
	request.send();
}

export const GetStreams = () => {
	let url = "/api/stream/"
	let request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
			let resp = JSON.parse(request.responseText);
			console.log(resp);
		}
	}
	request.send();
}

export const createStream = () => {
	const url = "/api/stream/"
	const init = {
		method: POST,
		credentials: "same-origin"
	}

	return fetch(url, init)
	.then(response => response.json())
}

export const fetchStreams = () => {
	let url = "/api/stream/"
	return fetch(url)
	.then(response => response.json());
}
