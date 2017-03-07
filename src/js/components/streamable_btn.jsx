import React from "react";
import ReactDOM from "react-dom";
import {startPitching, stopPitching} from "../actions/actions"
import store from "../store/store"
import Streamer from "../audio/streamer";

export default class StreamableBtn extends React.Component {
	constructor() {
		super();
		this.streamer = new Streamer();
	}

	componentDidMount() {
		if (this.props.streamId) {
			this.streamer.start(this.props.streamId);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.streamId !== prevProps.streamId) {
			if (this.props.streamId) {
				this.streamer.start(this.props.streamId);
			} else {
				this.streamer.stop();
			}
		}
	}

	componentWillUnmount() {
		console.log("Unmount");
		this.streamer.stop();
	}

	render() {
		if (this.props.streamId) {
			return <button className="btn btn-primary margin-10px" onClick={()=>this.stopStream()}>Stop pitching!</button>;
		} else {
			return <button className="btn btn-primary margin-10px" onClick={()=>this.startStream()}>Start pitching!</button>;
		}
	}

	stopStream() {
		console.log("stopping stream")
		store.dispatch(stopPitching());
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
