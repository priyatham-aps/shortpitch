import React from "react";
import StreamableBtn from "./streamable_btn"
import ChatView from "./chat_view";
import EventInfo from "./event_info";
import LiveCount from "./live_count";
import Share from "./share";
import {sendComment} from "../actions/socket";
import {startPitching, stopPitching,getEventInfo,setCurrentView} from "../actions/actions";
import store from "../store/store"

export default class PublishView extends React.Component {
	constructor() {
		super();

		this.state = {
			isStreaming: false
		}

		this.startStream = this.startStream.bind(this);
		this.stopStream = this.stopStream.bind(this);
		this.sendComment = this.sendComment.bind(this);
	}

	componentDidMount() {
		if (this.props.eventId) {
			this.startStream();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.eventId !== prevProps.eventId && this.props.eventId) {
			this.startStream();
		}
	}

	render() {
		const {event,eventInfo,comments} = this.props;
		let shareUrl = window.location.origin;
		if (this.state.isStreaming) {
			shareUrl = `${window.location.origin}/subscribe/${this.props.streamId}`
		}

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
						<LiveCount isStreaming={this.state.isStreaming}></LiveCount>
						<div className="streamer-wrapper subscribe-stream-wrapper">
							<div className="publish-recording-icons">
								<StreamableBtn isStreaming={this.state.isStreaming} start={this.startStream} stop={this.stopStream}></StreamableBtn>
							</div>
						</div>
						<Share url={shareUrl}></Share>
					</div>
				</div>
			</div>
			</div>;
	}

	stopStream() {
		store.dispatch(stopPitching(this.props.streamId, this.props.eventId));
		this.setState({
			isStreaming: false
		});
	}

	startStream() {
		store.dispatch(startPitching(this.props.eventId));
		this.setState({
			isStreaming: true
		});
	}

	sendComment(cmt) {
		const {streamId, eventId} = this.props;
		sendComment(streamId, eventId, "anon", cmt);
	}
}

PublishView.propTypes = {
	streamId: React.PropTypes.string,
	eventId: React.PropTypes.string,
	comments: React.PropTypes.array
}

PublishView.defaultProps = {
	streamId: "",
	eventId: "",
	comments: []
}
