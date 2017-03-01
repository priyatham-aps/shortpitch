import store from "../store/store"
import {setStreamId} from "../actions/actions"

export const CreateStream = () => {
	let url = "/api/stream/"
	let request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
			let resp = JSON.parse(request.responseText);
			console.log(resp);
			console.log(resp.id);
			store.dispatch(setStreamId(resp.id));
			// pubStreamUrl = API_WS_SERVER_URL + "stream/publish/" + resp.data.id + "/"
			// subStreamUrl = resp.data.subscribe_url
			// trasportStreamUrl = resp.data.transport_url
			// document.getElementById("subscribe_url").innerHTML = subStreamUrl
		}
	}
	request.send();
}
