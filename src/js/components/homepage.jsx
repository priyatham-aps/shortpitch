import React from "react";
import StreamableBtn from "./streamable_btn";
import StreamsList from "./streams_list";
import EventInfo from "./event_info";
import Link from "./link"
import store from "../store/store";
import { setCurrentView, fetchEventAndStreams } from "../actions/actions";
import {PUBLISH_VIEW_KEY} from "./views";

export default class HomePage extends React.Component {
	render() {
		const {pitcher, streams, events,eventInfo, currentEvent, currentStream} = this.props;

		const event = events && events.length && currentEvent ? events.find(e => e.id === currentEvent) : null;

		if (event) {
			return <div>
						<div className="col-md-12 col-xs-12">
							<div className="row">
								<div className="col-md-3 col-xs-12 streamer-wrapper home-streamer-wrapper">
									<Link path={`/${PUBLISH_VIEW_KEY}`}>
										<img className="streamable_btn" src="/assets/img/record.svg"/>
									</Link>
									<div className="stream-prompt hidden-xs">Start Pitching Live!</div>
								</div>
								<div className="col-md-6 col-xs-12">
									<EventInfo textclass="dark" showstatus={true} event={event} eventInfo={eventInfo}></EventInfo>
								</div>
							</div>
						</div>
						<div className="col-md-12 col-xs-12">
							<hr style={{opacity:0.3}}></hr>
						</div>
						<div className="col-md-12 col-xs-12 hidden-xs">
							<Description></Description>
						</div>
						<div className="col-md-12 col-xs-12">
							<StreamsList streams={streams}></StreamsList>
						</div>
					</div>;
		} else {
			return <div>No current events!</div>;
		}
	}
}

class Description extends React.Component {
	render() {
		return <div>
					<div className="commentaryMessage">Live cricket commentary from </div>
					<div className="commentaryMessage">people around you</div>
				</div>
	}
}
