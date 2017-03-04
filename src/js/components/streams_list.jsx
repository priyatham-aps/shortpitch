import React from "react";
import ReactDOM from "react-dom";
import store from "../store/store"
import {getStreams} from "../actions/actions"
import PlayableCard from "./playable_card"

export default class StreamsList extends React.Component {
	componentWillMount() {
		store.dispatch(getStreams());
	}

	render() {
		const {streams} = this.props;
		const players = streams.map((s, i) => <PlayableCard key={i} streamId={s.id}/>);

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

StreamsList.PropTypes = {
	streams: React.PropTypes.arrayOf(React.PropTypes.string)
}

StreamsList.defaultProps = {
	streams: []
}
