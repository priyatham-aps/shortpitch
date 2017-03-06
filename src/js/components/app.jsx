import React from "react";
import StreamableBtn from "./streamable_btn";
import StreamsList from "./streams_list";
import EventsList from "./events_list";

export default class App extends React.Component {
	render() {
		let {pitcher, streams, events} = this.props.data;

		return <div>
			<EventsList events={events}></EventsList>
		</div>;
	}
}
