import React from "react";
import StreamableBtn from "./streamable_btn"
import ChatView from "./chat_view";
import {sendComment} from "../actions/socket";

export default class PublishView extends React.Component {
	constructor() {
		super();

		this.sendComment = this.sendComment.bind(this);
	}

	render() {
		const {streamId, eventId, comments} = this.props;
		return <div>
			<StreamableBtn streamId={streamId} eventId={eventId}></StreamableBtn>
			<ChatView comments={comments} sendComment={this.sendComment}></ChatView>
		</div>;
	}

	sendComment(cmt) {
		const {streamId, eventId} = this.props;
		sendComment(streamId, eventId, "anon", cmt);
	}
}

PublishView.propTypes = {
	streamId: React.PropTypes.string.isRequired,
	eventId: React.PropTypes.string.isRequired,
	comments: React.PropTypes.array.isRequired
}

PublishView.defaultProps = {
	streamId: "",
	eventId: "",
	comments: []
}
