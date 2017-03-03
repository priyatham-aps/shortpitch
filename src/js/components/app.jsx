import React from "react";
import StreamableBtn from "./streamable_btn";
import PlayableCrd from "./playable_crd";
import StreamLst from "./stream_lst";

export default class App extends React.Component {
	render() {
		let streamId = this.props.data;

		return <div>
			<StreamableBtn streamId={streamId}></StreamableBtn>
			<PlayableCrd streamId={streamId}></PlayableCrd>
		</div>
	}
}
