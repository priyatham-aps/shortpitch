import React from "react";
import ReactDOM from "react-dom";
import store from "../store/store"
import PlayableCard from "./playable_card"
import Link from "./link"
import {SUBSCRIBE_VIEW_KEY} from "./views";

export default class StreamsList extends React.Component {
	render() {
		const {streams} = this.props;
		let players
		if(streams) {
			players = streams.map((s, i) => <Link key={i} path={`${SUBSCRIBE_VIEW_KEY}/${s.user.id}`}>
					<PlayableCard
						stream={s}>
					</PlayableCard>
				</Link>
			);
		}

		return <div>
			{players}
		</div>;
	}
}

StreamsList.propTypes = {
	streams: React.PropTypes.arrayOf(React.PropTypes.object)
}

StreamsList.defaultProps = {
	streams: []
}
