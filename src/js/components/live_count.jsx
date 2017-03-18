import React from "react";

export default class LiveCount extends React.Component {
	render() {
		if (this.props.isStreaming) {
			return <div className="live-count">
						<img src="/assets/img/recording.svg"></img>
						<div className="live-count-text"> You are live now!</div>
					</div>
		} else {
			return <div></div>
		}
	}
}

LiveCount.propTypes = {
	isStreaming: React.PropTypes.bool
}

LiveCount.defaultProps = {
	isStreaming: true
}
