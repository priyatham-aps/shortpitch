import React from "react";
import HomePage from "./homepage";
import PublishView from "./publish_view";
import SubscribeView from "./subscribe_view";
import Login from "./login";
import { fetchEventAndStreams, startPlaying } from "../actions/actions";
import store from "../store/store";
import * as views from "./views";

export default class App extends React.Component {
	componentWillMount() {
		store.dispatch(fetchEventAndStreams());
	}

	render() {
		const {pitcher, events, streams, comments, currentEvent, currentStream, currentView} = this.props.data;

		switch (currentView) {
			case views.PUBLISH_VIEW:
				return <PublishView streamId={pitcher} eventId={currentEvent} comments={comments}></PublishView>;
				break;
			case views.SUBSCRIBE_VIEW:
				const event = events && events.length && currentEvent ? events.find(e => e.id === currentEvent) : {};
				const stream = streams && streams.length && currentStream ? streams.find(s => s.id === currentStream) : {};
				return <SubscribeView stream={stream} event={event} currentStream={currentStream} comments={comments}></SubscribeView>;
				break;
			case views.LOGIN_VIEW:
				return <Login></Login>;
				break;
			default:
				return <HomePage {...this.props.data}></HomePage>;
				break;
		}
	}
}
