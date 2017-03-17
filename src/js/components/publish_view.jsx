import React from "react";
import StreamableBtn from "./streamable_btn"
import ChatView from "./chat_view";
import {sendComment} from "../actions/socket";
import {startPitching, stopPitching} from "../actions/actions";
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
		this.startStream();
	}

	render() {
		const {comments} = this.props;
		return <div>
			<StreamableBtn isStreaming={this.state.isStreaming} start={this.startStream} stop={this.stopStream}></StreamableBtn>
			<ChatView comments={comments} sendComment={this.sendComment}></ChatView>
		</div>;
	}

	stopStream() {
		console.log("stopping stream")
		store.dispatch(stopPitching(this.props.streamId, this.props.eventId));
		this.setState({
			isStreaming: false
		});
	}

	startStream() {
		console.log("starting stream");
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
