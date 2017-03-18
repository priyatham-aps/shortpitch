import React from "react";
import SubscribeCard from "./subscribe_card";
import ChatView from "./chat_view";
import EventInfo from "./event_info";
import Share from "./share";
import Link from "./link"
import store from "../store/store";
import { sendComment } from "../actions/socket";
import { startPlaying, stopPlaying, setCurrentView} from "../actions/actions";
import {PUBLISH_VIEW} from "./views";

export default class SubscribeView extends React.Component {
	constructor() {
		super();
		this.state = {
			isPlaying: true
		}

		this.sendComment = this.sendComment.bind(this);
	}

	componentDidMount() {
		if (this.props.stream.id) {
			this.playStream();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.stream !== prevProps.stream && this.props.stream.id) {
			this.playStream();
		}
	}

	componentWillUnmount() {
		if (this.state.isPlaying) {
			this.stopStream();
		}
	}

	render() {
		const {stream,event,eventInfo,comments} = this.props;
		const shareUrl = window.location.href;
		return <div>
			<div className="subscribeview-parent">
				<div className="col-md-4 chat-parent">
					<ChatView comments={comments} sendComment={this.sendComment}></ChatView>
				</div>
				<div className="col-md-6">
					<div className="col-md-9 subscribe-left-wrapper col-xs-12">
						<div className="subscribe-eventinfo-wrapper">
							<EventInfo textclass="white" showstatus={false} event={event} eventInfo={eventInfo}></EventInfo>
						</div>
						<div className="streamer-wrapper subscribe-stream-wrapper">
							<Link path="/publish">
								<img className="streamable_btn" src="/assets/img/record.svg"/>
							</Link>
							<div className="stream-prompt">Start your Recording</div>
						</div>
						<div className="row">
							<div className="col-md-10">
								<SubscribeCard
									stream={stream}
									isPlaying={this.state.isPlaying}
									play={() => this.playStream()}
									stop={() => this.stopStream()}>
								</SubscribeCard>
							</div>
							<div className="col-md-2">
								<Share url={shareUrl}></Share>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	}

	stopStream() {
		store.dispatch(stopPlaying(this.props.stream.id, this.props.event.id));

		this.setState({
			isPlaying: false
		});
	}

	playStream() {
		console.log("streamid " + this.props.stream.id);
		store.dispatch(startPlaying(this.props.stream.id, this.props.event.id));

		this.setState({
			isPlaying: true
		});
	}

	sendComment(cmt) {
		sendComment(this.props.stream.id, this.props.event.id, "anon", cmt);
	}
}

SubscribeView.propTypes = {
	stream: React.PropTypes.object.isRequired,
	event: React.PropTypes.object.isRequired,
	comments: React.PropTypes.array.isRequired
}

SubscribeView.defaultProps = {
	stream: {},
	event: {},
	comments: []
}
