import React from "react";
import ReactDOM from "react-dom";
import store from "../store/store"
import PlayableCard from "./playable_card"

export default class StreamsList extends React.Component {
	render() {
		const {streams} = this.props;
		let players
		if(streams){
			players =  streams.map((s, i) => <PlayableCard key={i} stream={s}/>);
		}

		return <div>
			{players}
		</div>;
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

StreamsList.propTypes = {
	streams: React.PropTypes.arrayOf(React.PropTypes.object)
}

StreamsList.defaultProps = {
	streams: []
}
