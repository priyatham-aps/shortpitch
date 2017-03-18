import React from "react";

export default class CardInfo extends React.Component {
	render() {
		const user = this.props.stream.user || {};
		const subscriber_count = this.props.stream.subscriber_count || 0;
		const backgroundImageLoc = "url('//graph.facebook.com/"+user.fbid+"/picture?type=large')"

		return <div className="row">
			<div className="col-xs-3 sp-img-container" >
				<div className="sp-user-profile " style={{backgroundImage:backgroundImageLoc}}></div>
				<div className="username">{user.nickname}</div>
			</div>
			<div className="col-xs-6 sp-soundwave">
				<img src="/assets/img/soundwave.png"></img>
			</div>
			<div className="col-xs-2 subscriber_count">
				{subscriber_count}
				<p>Listeners</p>
			</div>
			<div className="col-xs-1"></div>
		</div>;
	}
}

CardInfo.propTypes = {
	stream: React.PropTypes.object.isRequired
}

CardInfo.defaultProps = {
	stream: {}
}
