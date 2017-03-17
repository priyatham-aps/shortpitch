import React from "react";
import ReactDOM from "react-dom";
import store from "../store/store"
import PlayableCard from "./playable_card"
import Link from "./link"
import { setSubscribeView } from "../actions/actions";

export default class StreamsList extends React.Component {
	render() {
		const {streams} = this.props;
		let players
		if(streams) {
			players = streams.map((s, i) => <Link key={i} path={`subscribe/${s.id}`}>
					<PlayableCard
						stream={s}
						play={() => this.playStream(s.id)}>
					</PlayableCard>
				</Link>
			);
		}

		return <div>
			{players}
		</div>;
	}

	playStream(sId) {
		store.dispatch(setSubscribeView(sId));
	}
}

StreamsList.propTypes = {
	streams: React.PropTypes.arrayOf(React.PropTypes.object)
}

StreamsList.defaultProps = {
	streams: []
}
