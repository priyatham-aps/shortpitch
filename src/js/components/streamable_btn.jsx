import React from "react";
import ReactDOM from "react-dom";
import {startPitching, stopPitching} from "../actions/actions"
import store from "../store/store"
import Streamer from "../audio/streamer";
import {defaultConfig} from '../globals'

export default class StreamableBtn extends React.Component {
	constructor() {
		super();
	}

	render() {
		if (this.props.streamId) {
			return <button className="btn btn-danger margin-10px pitchbtn" onClick={()=>this.stopStream()}>Stop pitching &nbsp;&nbsp;<span><i className="fa fa-microphone-slash"></i></span></button>;
		} else {
			return <button className="btn btn-warning margin-10px pitchbtn" onClick={()=>this.startStream()}>Start pitching &nbsp;&nbsp;<span><i className="fa fa-microphone"></i></span></button>;
		}
	}

	stopStream() {
		console.log("stopping stream")
		store.dispatch(stopPitching(this.props.streamId, this.props.eventId));
	}

	startStream() {
		console.log("starting stream");
		store.dispatch(startPitching(this.props.eventId));
	}
}

StreamableBtn.propTypes = {
	streamId: React.PropTypes.string,
	eventId: React.PropTypes.string
}

StreamableBtn.defaultProps = {
	streamId: "",
	eventId: ""
}
