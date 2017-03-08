import React from "react";
import StreamableBtn from "./streamable_btn";
import StreamsList from "./streams_list";
import EventInfo from "./event_info";
import { fetchEventAndStreams } from "../actions/actions";
import store from "../store/store"

export default class App extends React.Component {
	componentWillMount() {
		store.dispatch(fetchEventAndStreams());
	}

	render() {
		const {pitcher, streams, events, currentEvent} = this.props.data;

		const event = events && events.length && currentEvent ? events.find(e => e.id === currentEvent) : null;

		if (event) {
			return <div>
				<StreamableBtn streamId={pitcher} eventId={currentEvent}></StreamableBtn>
				<EventInfo event={event}></EventInfo>
				<StreamsList streams={streams}></StreamsList>
			</div>;
		} else {
			return <div>No current events!</div>;
		}
	}
}
