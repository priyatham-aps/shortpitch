import React from "react";

export default class StreamableBtn extends React.Component {
	render() {
		if (this.props.isStreaming) {
			return <button className="btn btn-danger margin-10px pitchbtn" onClick={()=>this.stopStream()}>Stop pitching &nbsp;&nbsp;<span><i className="fa fa-microphone-slash"></i></span></button>;

		} else {
			//return <button className="btn btn-warning margin-10px pitchbtn" onClick={()=>this.startStream()}>Start pitching &nbsp;&nbsp;<span><i className="fa fa-microphone"></i></span></button>;
			return <a className="streamable_btn" onClick={()=>this.startStream()}><img src="/assets/img/record.svg"/></a>
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
