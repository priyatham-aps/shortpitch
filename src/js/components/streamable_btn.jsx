import React from "react";

export default class StreamableBtn extends React.Component {
	render() {
		if (this.props.isStreaming) {
			//return <button className="btn btn-danger margin-10px pitchbtn" onClick={()=>this.stopStream()}>Stop pitching &nbsp;&nbsp;<span><i className="fa fa-microphone-slash"></i></span></button>;
			return <div><a onClick={()=>this.stopStream()}><img className="streamable_btn" src="/assets/img/stoprecording.svg"/></a><div>Stop Pitching</div></div>
		} else {
			//return <button className="btn btn-warning margin-10px pitchbtn" onClick={()=>this.startStream()}>Start pitching &nbsp;&nbsp;<span><i className="fa fa-microphone"></i></span></button>;
			return <div><a onClick={()=>this.startStream()}><img className="streamable_btn" src="/assets/img/record.svg"/></a><div>Start Pitching Again!</div></div>
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
