import React from "react";
import CardInfo from "./card_info";

export default class PlayableCard extends React.Component {
	constructor() {
		super();
		this.play = this.play.bind(this);
	}

	render() {
		return (
			<div className="col-md-4 col-xs-12 playable-card">
				<div className="sp-slat">
							<div className="sp-play-pause col-md-2 col-xs-3" onClick={this.play}>
								<div className="stream-toggle  margin-10px"><img className="play-pause-icons" src="/assets/img/play.png"/></div>
							</div>
							<div className="col-md-9 sp-meta-container clickable">
								<CardInfo stream={this.props.stream}></CardInfo>
							</div>

				</div>
			</div>
		)
	}

	play() {
		if (this.props.play) {
			this.props.play();
		}
	}
}

PlayableCard.propTypes = {
	stream: React.PropTypes.object.isRequired,
	play: React.PropTypes.func
}

PlayableCard.defaultProps = {
	stream: {}
}
