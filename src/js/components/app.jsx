import React from "react";
import StreamableBtn from "./streamable_btn";

export default class App extends React.Component {
	render() {
		let streamId = this.props.data;

		return <div>
			<StreamableBtn streamId={streamId}></StreamableBtn>
		</div>
	}
}
