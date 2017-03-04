import store from "../store/store"
import {setPitcher} from "../actions/actions"

const POST = "POST";
const GET = "GET";

export const createStream = () => {
	const url = "/api/stream/";
	const init = {
		method: POST,
		credentials: "same-origin"
	};

	return fetch(url, init)
	.then(response => response.json());
}

export const fetchStreams = () => {
	let url = "/api/stream/";
	const init = {
		method: GET,
		credentials: "same-origin"
	};

	return fetch(url, init)
	.then(response => response.json());
}
