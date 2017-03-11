import React from "react";
import ReactDOM from "react-dom";
import store from "../store/store"
import PlayableCard from "./playable_card"
import { setCurrentView, setCurrentStream, stopPlayingStream } from "../actions/actions";
import { SUBSCRIBE_VIEW } from "./views";

export default class StreamsList extends React.Component {
	render() {
		const {streams, currentStream} = this.props;
		let players
		if(streams){
			players = streams.map((s, i) => <PlayableCard
				key={i}
				stream={s}
				isPlaying={s.id === currentStream}
				play={() => this.playStream(s.id)}
				stop={() => this.stopStream(s.id)}
				onPlayerClick={() => this.onPlayerClick(s.id)}>
			</PlayableCard>);
		}

		return <div>
			{players}
		</div>;
	}

	stopStream(id) {
		store.dispatch(stopPlayingStream(id));
	}

	playStream(id) {
		store.dispatch(setCurrentStream(id));
	}

	onPlayerClick(id) {
		store.dispatch(setCurrentView(SUBSCRIBE_VIEW));
		store.dispatch(setCurrentStream(id));
	}
}

StreamsList.propTypes = {
	streams: React.PropTypes.arrayOf(React.PropTypes.object),
	currentStream: React.PropTypes.string
}

StreamsList.defaultProps = {
	streams: [],
	currentStream: ""
}
