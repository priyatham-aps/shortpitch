import React from "react";
import ReactDOM from 'react-dom';
import StreamableBtn from "./streamable_btn";

export default class App extends React.Component {
	render() {
		return <div>
			<h1>Short Pitch!</h1>
			<StreamableBtn></StreamableBtn>
		</div>
	}
}
