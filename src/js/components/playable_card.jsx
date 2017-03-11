import React from "react";
import Player from "../audio/player";

export default class PlayableCard extends React.Component {
	constructor(props) {
		super(props);
		this.player = new Player(this.props.stream.id)
		this.state = {
			isStreamPlaying:false
		};
	}

	componentWillMount() {
		if (this.props.isPlaying) {
			this.player.start();
		}
	}

	componentWillUpdate(nextProps) {
		if (this.props.isPlaying !== nextProps.isPlaying) {
			if (nextProps.isPlaying) {
				this.player.start();
			} else {
				this.player.stop();
			}
		}
	}

	componentWillUnmount() {
		if (this.props.isPlaying) {
			this.player.stop();
		}
	}

	render() {
		let button
		if (this.props.isPlaying) {
			button = <button className="btn btn-primary margin-10px" onClick={()=>this.props.stop()}>Stop</button>;
		} else {
			button =  <button className="btn btn-primary margin-10px" onClick={()=>this.props.play()}>Play</button>;
		}

		return (
			<div className="sp-slat">
					<div className="sp-play-pause">
						{button}
					</div>
					<div className="col-md-10 sp-meta-container clickable" onClick={() => this.onCardClick()}>
						<CardInfo stream={this.props.stream}></CardInfo>
					</div>
			</div>
		)
	}

	onCardClick() {
		if (this.props.onPlayerClick) {
			this.props.onPlayerClick();
		}
	}
}

PlayableCard.propTypes = {
	stream: React.PropTypes.object.isRequired,
	isPlaying: React.PropTypes.bool.isRequired,
	play: React.PropTypes.func.isRequired,
	stop: React.PropTypes.func.isRequired,
	onPlayerClick: React.PropTypes.func
}

PlayableCard.defaultProps = {
	stream: {},
	isPlaying: false
}

class CardInfo extends React.Component {
	render() {
		const user = this.props.stream.user || {};
		const subscriber_count = this.props.stream.subscriber_count || 0;
		const backgroundImageLoc = "url('//graph.facebook.com/"+user.fbid+"/picture?type=large')"

		return <div>
			<div className="col-md-3 sp-img-container" >
				<div className="sp-user-profile " style={{backgroundImage:backgroundImageLoc}}></div>
				<h6>{user.nickname}</h6>
			</div>
			<div className="col-md-6"></div>
			<div className="col-md-2">
				{subscriber_count}
				<p>Listeners</p>
			</div>
			<div className="col-md-1"></div>
		</div>;
	}
}

CardInfo.propTypes = {
	stream: React.PropTypes.object.isRequired
}

CardInfo.defaultProps = {
	stream: {}
}
