import React from "react";
import CardInfo from "./card_info";

export default class SubscribeCard extends React.Component {
	constructor() {
		super();

		this.onClick = this.onClick.bind(this);
		this.onTouchEnd = this.onTouchEnd.bind(this);
	}

	render() {
		let btnImgSrc = "/assets/img/play.png";
		if (this.props.isPlaying) {
			btnImgSrc = "/assets/img/pause.svg";
		}

		return (
				<div className="sp-slat" onClick={this.onClick} onTouchEnd={this.onTouchEnd} onTouchStart={(e) => this.onTouchStart(e)}>
					<div className="sp-play-pause col-md-2 col-xs-3">
						<div className="stream-toggle margin-10px">
							<img className="play-pause-icons" src={btnImgSrc}/>
						</div>
					</div>
					<div className="col-md-9 sp-meta-container clickable">
						<CardInfo stream={this.props.stream} streamInfo={this.props.streamInfo}></CardInfo>
					</div>
				</div>
		)
	}

	onClick(e) {
		e.preventDefault();
		if (this.props.isPlaying) {
			this.props.stop();
		} else {
			this.props.play();
		}
	}

	onTouchEnd(e) {
		e.preventDefault();
		if (this.props.isPlaying) {
			this.props.stop();
		} else {
			this.props.play();
		}
	}
}

SubscribeCard.propTypes = {
	stream: React.PropTypes.object.isRequired,
	isPlaying: React.PropTypes.bool.isRequired,
	play: React.PropTypes.func.isRequired,
	stop: React.PropTypes.func.isRequired
}

SubscribeCard.defaultProps = {
	stream: {},
	isPlaying: false
}
