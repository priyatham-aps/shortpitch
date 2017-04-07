import React from "react";
import StreamableBtn from "./streamable_btn"
import ChatView from "./chat_view";
import EventInfo from "./event_info";
import LiveCount from "./live_count";
import Share from "./share";
import {sendComment} from "../actions/socket";
import {startPitching, stopPitching,getEventInfo,setCurrentView} from "../actions/actions";
import store from "../store/store"
import {SUBSCRIBE_VIEW_KEY} from "./views";

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

	componentWillUnmount() {
		if (this.state.isStreaming) {
			this.stopStream();
		}
	}

	render() {
		const {event,eventInfo,comments} = this.props;
		let shareEl;
		if (this.state.isStreaming && this.props.stream && this.props.stream.user && this.props.stream.user.id) {
			const shareUrl = `${window.location.origin}/${SUBSCRIBE_VIEW_KEY}/${this.props.stream.user.id}`
			shareEl = <Share url={shareUrl} horizontal={true}></Share>
		}

		return <div className="row">
			<div className="col-md-4 col-md-offset-1 chat-parent">
					<ChatView comments={comments} sendComment={this.sendComment}></ChatView>
			</div>
			<div className="col-md-5 col-md-offset-1">
				<EventInfo textclass="white" showstatus={false} event={event} eventInfo={eventInfo}></EventInfo>
				<div className="streamer-wrapper publish-streamer-wrapper">
					<div className="publish-recording-icons">
						<StreamableBtn isStreaming={this.state.isStreaming} start={this.startStream} stop={this.stopStream}></StreamableBtn>
					</div>
				</div>
				<LiveCount isStreaming={this.state.isStreaming} streamInfo={this.props.streamInfo}></LiveCount>
				{shareEl}
			</div>
		</div>;
	}

	stopStream() {
		store.dispatch(stopPitching(this.props.stream.id, this.props.eventId));
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

	sendComment(usr,cmt) {
		const {stream, eventId} = this.props;
		var username = usr? usr:"anon"
		sendComment(stream.id, eventId,username,cmt);
	}
}

PublishView.propTypes = {
	stream: React.PropTypes.object,
	eventId: React.PropTypes.string,
	comments: React.PropTypes.array,
	streamInfo: React.PropTypes.object
}

PublishView.defaultProps = {
	stream: {},
	eventId: "",
	comments: [],
	streamInfo: {}
}
