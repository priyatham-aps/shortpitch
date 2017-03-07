import React from "react";

export default class EventInfo extends React.Component {
	render() {
		const {event} = this.props;
		return <div>{event.name}</div>;
	}
}

EventInfo.propTypes = {
	event: React.PropTypes.object
}

EventInfo.defaultProps = {
	event: {}
}
