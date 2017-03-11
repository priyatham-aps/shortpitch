import store from "../store/store"
import {setPitcher} from "../actions/actions"

const POST = "POST";
const GET = "GET";

export const createStream = (eId) => {
	const url = `/api/event/${eId}/stream`;
	const init = {
		method: POST,
		credentials: "same-origin"
	};

	return fetch(url, init)
	.then(response => response.json());
}

export const fetchStreams = (eId) => {
	const url = `/api/event/${eId}/stream`;
	const init = {
		method: GET
	};

	return fetch(url, init)
	.then(response => response.json());
}

export const fetchEvents = () => {
	const url = "/api/event/";
	const init = {
		method: GET,
		credentials: "same-origin"
	}

	return fetch(url, init)
	.then(response => response.json());
}
