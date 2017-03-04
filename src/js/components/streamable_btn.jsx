import React from "react";
import ReactDOM from "react-dom";
import {createStream, removeStreamId} from "../actions/actions"
import store from "../store/store"
import Streamer from "../audio/streamer";

export default class StreamableBtn extends React.Component {
	constructor() {
		super();

		this.streamer = new Streamer();
		this.state = {
			isStreamRunning:false
		};
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
		if (this.props.streamId) {
			return <button className="btn btn-primary margin-10px" onClick={()=>this.stopStream()}>Stop pitching!</button>;
		} else {
			return <button className="btn btn-primary margin-10px" onClick={()=>this.startStream()}>Start pitching!</button>;
		}
	}

	stopStream(){
		console.log("stopping stream")
		store.dispatch(removeStreamId());
	}

	startStream(){
		console.log("starting stream");
		store.dispatch(createStream());
	}
}
