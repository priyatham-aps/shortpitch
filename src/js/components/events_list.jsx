import React from "react";
import store from "../store/store"
import {fetchEvents, selectCurrentEvent} from "../actions/actions"

export default class EventsList extends React.Component {
	componentWillMount() {
		store.dispatch(fetchEvents());
	}

	render() {
		const {events} = this.props;

		if (events.length === 0) {
			return <p>No events</p>
		}

		const eventEls = events.map((e, i) => <li key={i} className="clickable" onClick={this.onEventClick.bind(this, e)}>{e.name}</li>)
		return <ul>{eventEls}</ul>
	}

	onEventClick(e) {
		console.log("Event clicked: ", e);
		store.dispatch(selectCurrentEvent(e.id));
	}
}
