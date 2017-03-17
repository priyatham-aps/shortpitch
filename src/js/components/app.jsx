import React from "react";
import HomePage from "./homepage";
import PublishView from "./publish_view";
import SubscribeView from "./subscribe_view";
import Login from "./login";
import { fetchEventAndStreams } from "../actions/actions";
import store from "../store/store";
import * as views from "./views";

export default class App extends React.Component {
	render() {
		const {pitcher, events, eventInfo, streams, comments, currentEvent, currentStream, currentPath} = this.props.data;
		const event = events && events.length && currentEvent ? events.find(e => e.id === currentEvent) : {};
		switch (currentPath.key) {
			case views.PUBLISH_VIEW_KEY:
				return <PublishView streamId={pitcher} event={event} eventInfo={eventInfo} eventId={currentEvent} comments={comments}></PublishView>;
				break;
			case views.SUBSCRIBE_VIEW_KEY:
				const currentStream = currentPath.param;
				const stream = streams && streams.length && currentStream ? streams.find(s => s.id === currentStream) : {};
				return <SubscribeView stream={stream} eventInfo={eventInfo} event={event} comments={comments}></SubscribeView>;
				break;
			case views.LOGIN_VIEW_KEY:
				return <Login></Login>;
				break;
			default:
				return <HomePage {...this.props.data}></HomePage>;
				break;
		}
	}

	componentDidMount() {
		store.dispatch(fetchEventAndStreams());
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.data.currentPath !== prevProps.data.currentPath && this.props.data.currentPath.key === "") {
			console.log("fetching events in update");
			store.dispatch(fetchEventAndStreams());
		}
	}
}
