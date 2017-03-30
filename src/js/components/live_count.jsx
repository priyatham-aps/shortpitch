import React from "react";

export default class LiveCount extends React.Component {
	render() {
		const count = this.props.streamInfo.activeCount ? this.props.streamInfo.activeCount : 0;
		if (this.props.isStreaming) {
			return <div className="live-count">
						<img src="/assets/img/recording.svg"></img>
						<div className="live-count-text">{`${count} people listening`}</div>
					</div>
		} else {
			return <div></div>
		}
	}
}

LiveCount.propTypes = {
	isStreaming: React.PropTypes.bool,
	streamInfo: React.PropTypes.object
}

LiveCount.defaultProps = {
	isStreaming: true,
	streamInfo: {}
}
