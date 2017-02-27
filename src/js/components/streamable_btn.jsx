import React from "react";
import ReactDOM from "react-dom";

export default class StreamableBtn extends React.Component {
	constructor() {
		super()
		this.state={
			buttonText:"Start Pitching",
			isStreamRunning:false
		}
	}
	render() {
		return <button className="btn btn-primary margin-10px" onClick={()=>this.toggleStreamStatus()}>{this.state.buttonText}</button>;
	}

	toggleStreamStatus() {
		
		this.setState({
			isStreamRunning : !this.state.isStreamRunning,
			buttonText : this.state.isStreamRunning?  "Start Pitching":"Stop Pitching"
		})
		if(this.state.isStreamRunning){
			this.stopStream()
		}
		else{
			this.startStream()
		}
		
	}
	stopStream(){
		console.log("stopping stream")
	}
	startStream(){
		console.log("starting stream")
	}
}
