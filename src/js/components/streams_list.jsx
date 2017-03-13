import React from "react";
import ReactDOM from "react-dom";
import store from "../store/store"
import PlayableCard from "./playable_card"
import { setCurrentView, startPlaying, stopPlaying } from "../actions/actions";
import { SUBSCRIBE_VIEW } from "./views";

export default class StreamsList extends React.Component {
	render() {
		const {streams, currentStream, eventId} = this.props;
		let players
		if(streams){
			players = streams.map((s, i) => <PlayableCard
				key={i}
				stream={s}
				isPlaying={s.id === currentStream}
				play={() => this.playStream(s.id, eventId)}
				stop={() => this.stopStream(s.id, eventId)}
				onPlayerClick={() => this.onPlayerClick(s.id)}>
			</PlayableCard>);
		}

		return <div>
			{players}
		</div>;
	}

	stopStream(sId, eId) {
		store.dispatch(stopPlaying(sId, eId));
	}

	playStream(sId, eId) {
		store.dispatch(startPlaying(sId, eId));
	}

	onPlayerClick(id) {
		store.dispatch(setCurrentView(SUBSCRIBE_VIEW));
		store.dispatch(setCurrentStream(id));
	}
}

StreamsList.propTypes = {
	streams: React.PropTypes.arrayOf(React.PropTypes.object),
	currentStream: React.PropTypes.string,
	eventId: React.PropTypes.string
}

StreamsList.defaultProps = {
	streams: [],
	currentStream: "",
	eventId: ""
}
