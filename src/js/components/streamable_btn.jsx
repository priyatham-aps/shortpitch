import React from "react";

export default class StreamableBtn extends React.Component {
	render() {
		if (this.props.isStreaming) {
			return <div><a onClick={()=>this.stopStream()}><img className="stop-recording" src="/assets/img/stoprecording.svg"/></a><div>Stop pitching</div></div>
		} else {
			return <div><a onClick={()=>this.startStream()}><img className="restart-recording" src="/assets/img/record.svg"/></a><div>Start pitching again.</div></div>
		}
	}

	stopStream() {
		this.props.stop();
	}

	startStream() {
		this.props.start();
	}
}

StreamableBtn.propTypes = {
	isStreaming: React.PropTypes.bool,
	start: React.PropTypes.func.isRequired,
	stop: React.PropTypes.func.isRequired
}

StreamableBtn.defaultProps = {
	isStreaming: false
}
