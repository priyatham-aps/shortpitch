
class ControlSocketClass {
	constructor() {
		let socketUrl
		if(location.protocol=="http:"){
			socketUrl = "ws://"+location.host+"/control"
		}
		else if(location.protocol=="https:"){
			socketUrl = "wss://"+location.host+"/control"
		}
		this.socketUrl = socketUrl
		
	}

	connect() {
		this.controlSocket = new WebSocket(this.socketUrl)
		return this.controlSocket 
	}
}

const cs = new ControlSocketClass();

export const ControlSocket = () => {
	if(cs) { return cs;}

	cs = new ControlSocketClass();
	return cs;
}