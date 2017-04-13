import React from "react";

export default class LiveCount extends React.Component {
	render() {
		const count = this.props.activeListeners || 0;
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
	activeListeners: React.PropTypes.number
}

LiveCount.defaultProps = {
	isStreaming: true,
	activeListeners: 0
}
