const POST = "POST";
const GET = "GET";

export const createStream = (eId) => {
	const url = `/api/event/${eId}/stream`;
	const init = {
		method: POST,
		credentials: "same-origin"
	};

	return fetch(url, init)
	.then(response => {
			var promise = new Promise((resolve,reject)=>{
				if(response.status!=401) resolve(response.json())
				else reject(response)
			})
			return promise
		});
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
