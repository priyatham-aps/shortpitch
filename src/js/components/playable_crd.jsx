import React from "react";
import ReactDOM from "react-dom";
import store from "../store/store"
import Player from "../audio/player";

export default class PlayableCrd extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isStreamPlaying:false
		};
	}
	componentWillUpdate(nextProps, nextState) {
		this.player = new Player(nextProps.streamId);
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
