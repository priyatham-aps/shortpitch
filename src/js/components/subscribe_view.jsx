import React from "react";
import PlayableCard from "./playable_card";
import ChatView from "./chat_view";
import EventInfo from "./event_info";
import store from "../store/store";
import {sendComment} from "../actions/socket";

export default class SubscribeView extends React.Component {
	constructor() {
		super();
		this.state = {
			isPlaying: true
		}

		this.sendComment = this.sendComment.bind(this);
	}

	render() {
		const {stream, event, currentStream, comments} = this.props;
		return <div>
			<ChatView comments={comments} sendComment={this.sendComment}></ChatView>
			<EventInfo event={event}></EventInfo>
			<PlayableCard
				stream={stream}
				isPlaying={this.state.isPlaying}
				play={() => this.playStream()}
				stop={() => this.stopStream()}>
			</PlayableCard>
		</div>
	}

	stopStream() {
		this.setState({
			isPlaying: false
		});
	}

	playStream() {
		this.setState({
			isPlaying: true
		});
	}

	sendComment(cmt) {
		const {streamId, eventId} = this.props;
		sendComment(streamId, eventId, "anon", cmt);
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
