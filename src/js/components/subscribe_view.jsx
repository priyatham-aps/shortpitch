import React from "react";
import SubscribeCard from "./subscribe_card";
import ChatView from "./chat_view";
import EventInfo from "./event_info";
import store from "../store/store";
import {sendComment} from "../actions/socket";
import { startPlaying, stopPlaying,getEventInfo} from "../actions/actions";

export default class SubscribeView extends React.Component {
	constructor() {
		super();
		this.state = {
			isPlaying: true
		}

		this.sendComment = this.sendComment.bind(this);
	}

	componentDidMount() {
		this.playStream();
	}

	render() {
		const {stream,event,eventInfo,comments} = this.props;
		return <div>
			<div className="col-md-6">
				<ChatView comments={comments} sendComment={this.sendComment}></ChatView>
			</div>
			<div className="col-md-6">
				<EventInfo event={event} eventInfo={eventInfo}></EventInfo>
				<SubscribeCard
					stream={stream}
					isPlaying={this.state.isPlaying}
					play={() => this.playStream()}
					stop={() => this.stopStream()}>
				</SubscribeCard>
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
