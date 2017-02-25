import React from "react";
import ReactDOM from "react-dom";

export default class CreateStreamBtn extends React.Component {
	render() {
		return <button className="btn btn-primary margin-10px" onClick={this.createStream}>Create Stream</button>;
	}

	createStream() {
		console.log("createStream");
	}
}
