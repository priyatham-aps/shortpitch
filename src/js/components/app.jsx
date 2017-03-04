import React from "react";
import StreamableBtn from "./streamable_btn";
import StreamsList from "./streams_list";

export default class App extends React.Component {
	render() {
		let {pitcher, streams} = this.props.data;

		return <div>
			<StreamableBtn streamId={pitcher}></StreamableBtn>
			<StreamsList streams={streams}></StreamsList>
		</div>;
	}
}
