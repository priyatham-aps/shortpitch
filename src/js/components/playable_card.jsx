import React from "react";
import CardInfo from "./card_info";

export default class PlayableCard extends React.Component {
	render() {
		// let button
		// if (this.props.isPlaying) {
		// 	button = <div className="stream-toggle margin-10px" onClick={()=>this.props.stop()}><i className="fa fa-2x fa-pause"></i></div>;
		// } else {
		// 	button =  <div className="stream-toggle  margin-10px" onClick={()=>this.props.play()}><i className="fa fa-2x fa-play"></i></div>;
		// }

		return (
			<div className="col-md-4 col-xs-12">
				<div className="sp-slat">
							<div className="sp-play-pause col-md-2 col-xs-3">
								<div className="stream-toggle  margin-10px" onClick={()=>this.props.play()}><i className="fa fa-2x fa-play"></i></div>
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
	stream: React.PropTypes.object.isRequired,
	play: React.PropTypes.func.isRequired
}

PlayableCard.defaultProps = {
	stream: {}
}
