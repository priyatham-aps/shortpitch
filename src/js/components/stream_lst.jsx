import React from "react";
import ReactDOM from "react-dom";
import store from "../store/store"
import {GetStreams} from "../api/api"
import PlayableCrd from "./playable_crd"

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
		return(
			<div>
				<PlayableCrd/>
				<PlayableCrd/>
				<PlayableCrd/>
				<PlayableCrd/>
				<PlayableCrd/>
			</div>
		)
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
