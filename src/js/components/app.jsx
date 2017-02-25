import React from "react";
import ReactDOM from 'react-dom';
import CreateStreamBtn from "./create_stream_btn";

export default class App extends React.Component {
	render() {
		return <div>
			<h1>Short Pitch!</h1>
			<CreateStreamBtn></CreateStreamBtn>
		</div>
	}
}
