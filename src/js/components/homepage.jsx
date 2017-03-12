import React from "react";
import StreamableBtn from "./streamable_btn";
import StreamsList from "./streams_list";
import EventInfo from "./event_info";
import store from "../store/store";
import { setCurrentView } from "../actions/actions";
import {PUBLISH_VIEW} from "./views";

export default class HomePage extends React.Component {
	render() {
		const {pitcher, streams, events, currentEvent, currentStream} = this.props;

		const event = events && events.length && currentEvent ? events.find(e => e.id === currentEvent) : null;

		if (event) {
			return <div>
				<button className="btn btn-success margin-10px" onClick={()=>this.startPitching()}>Start pitching!</button>
				<EventInfo event={event}></EventInfo>
				<hr style={{opacity:0.3}}></hr>
				<Description></Description>
				<StreamsList streams={streams} currentStream={currentStream}></StreamsList>
			</div>;
		} else {
			return <div>No current events!</div>;
		}
	}

	startPitching() {
		store.dispatch(setCurrentView(PUBLISH_VIEW));
	}
}

class Description extends React.Component {
	render() {
		return <div className="commentaryMessage">Live Cricket Commentary from people around you</div>;
	}
}