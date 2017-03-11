import React from "react";
import PlayableCard from "./playable_card";
import ChatView from "./chat_view";
import EventInfo from "./event_info";
import store from "../store/store";

export default class SubscribeView extends React.Component {
	constructor() {
		super();
		this.state = {
			isPlaying: true
		}
	}

	render() {
		const {stream, event, currentStream} = this.props;
		return <div>
			<ChatView></ChatView>
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
}

SubscribeView.propTypes = {
	stream: React.PropTypes.object,
	event: React.PropTypes.object
}

SubscribeView.defaultProps = {
	stream: {},
	event: {}
}
