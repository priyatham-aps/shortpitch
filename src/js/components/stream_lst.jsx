import React from "react";
import ReactDOM from "react-dom";
import store from "../store/store"
import {GetStreams} from "../api/api"

export default class StreamLst extends React.Component {
	constructor() {
		super();
		
	}
	componentWillUpdate(nextProps, nextState) {
		if (this.props.streamId !== nextProps.streamId) {
			if (nextProps.streamId) {
				this.streamer.start(nextProps.streamId);
			} else {
				this.streamer.stop();
			}
		}
	}

	render() {
		console.log(this.props.streamId);
		if (this.state.isStreamPlaying) {
			return <button className="btn btn-primary margin-10px" onClick={()=>this.killStream()}>Stop</button>;
		} else {
			return <button className="btn btn-primary margin-10px" onClick={()=>this.playStream()}>Play</button>;
		}
	}

	killStream(){
		console.log("killing stream")
		this.player.stop()
		this.state.isStreamPlaying = false
	}

	playStream(){
		console.log("starting stream")
		this.player.start()
		this.state.isStreamPlaying = true
	}
}
