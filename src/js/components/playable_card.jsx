import React from "react";
import CardInfo from "./card_info";

export default class PlayableCard extends React.Component {
	render() {
		return (
			<div className="col-md-4 col-xs-12">
				<div className="sp-slat">
							<div className="sp-play-pause col-md-2 col-xs-3" onClick={()=>this.props.play()}>
								<div className="stream-toggle  margin-10px"><i className="fa fa-2x fa-play"></i></div>
							</div>
							<div className="col-md-9 sp-meta-container clickable">
								<CardInfo stream={this.props.stream}></CardInfo>
							</div>

				</div>
			</div>
		)
	}
}

PlayableCard.propTypes = {
	stream: React.PropTypes.object.isRequired
}

PlayableCard.defaultProps = {
	stream: {}
}
