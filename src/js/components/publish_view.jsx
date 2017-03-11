import React from "react";
import StreamableBtn from "./streamable_btn"
import ChatView from "./chat_view";

export default class PublishView extends React.Component {
	render() {
		const {streamId, eventId} = this.props;
		return <div>
			<StreamableBtn streamId={streamId} eventId={eventId}></StreamableBtn>
			<ChatView></ChatView>
		</div>;
	}
}

PublishView.propTypes = {
	streamId: React.PropTypes.string,
	eventId: React.PropTypes.string
}

PublishView.defaultProps = {
	streamId: "",
	eventId: ""
}
