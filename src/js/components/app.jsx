import React from "react";
import Header from "./header";
import HomePage from "./homepage";
import PublishView from "./publish_view";
import SubscribeView from "./subscribe_view";
import Login from "./login";
import { fetchEventAndStreams } from "../actions/actions";
import store from "../store/store";
import * as views from "./views";

export default class App extends React.Component {
	render() {
		const {currentPath} = this.props.data;
		const showClose = currentPath.key === views.PUBLISH_VIEW_KEY || currentPath.key === views.SUBSCRIBE_VIEW_KEY;
		const mainContent = this.getMainContent();

		return <div>
			<Header showClose={showClose}></Header>
			{mainContent}
		</div>;
	}

	getMainContent() {
		const {pitcher, events, eventInfo, streams, comments, currentEvent, currentStream, currentPath, streamInfo} = this.props.data;
		const event = events && events.length && currentEvent ? events.find(e => e.id === currentEvent) : {};
		switch (currentPath.key) {
			case views.PUBLISH_VIEW_KEY:
				return <PublishView
					stream={pitcher}
					event={event}
					eventInfo={eventInfo}
					eventId={currentEvent}
					comments={comments}
					streamInfo={streamInfo}>
				</PublishView>;
			case views.SUBSCRIBE_VIEW_KEY:
				const currentStreamer = currentPath.param;
				const stream = streams && streams.length && currentStreamer ? streams.find(s => s.user.id === currentStreamer) : {};
				return <SubscribeView
					stream={stream}
					eventInfo={eventInfo}
					event={event}
					comments={comments}
					streamInfo={streamInfo}>
				</SubscribeView>;
			case views.LOGIN_VIEW_KEY:
				return <Login></Login>;
			default:
				return <HomePage {...this.props.data}></HomePage>;
		}
	}

	componentDidMount() {
		store.dispatch(fetchEventAndStreams());
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.data.currentPath !== prevProps.data.currentPath && this.props.data.currentPath.key === "") {
			store.dispatch(fetchEventAndStreams());
		}
	}
}
