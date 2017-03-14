import React from "react";

export default class CardInfo extends React.Component {
	render() {
		const user = this.props.stream.user || {};
		const subscriber_count = this.props.stream.subscriber_count || 0;
		const backgroundImageLoc = "url('//graph.facebook.com/"+user.fbid+"/picture?type=large')"

		return <div>
			<div className="col-md-3 sp-img-container" >
				<div className="sp-user-profile " style={{backgroundImage:backgroundImageLoc}}></div>
				<h6>{user.nickname}</h6>
			</div>
			<div className="col-md-3"></div>
			<div className="col-md-3 subscriber_count">
				{subscriber_count}
				<p>Listeners</p>
			</div>
			<div className="col-md-3"></div>
		</div>;
	}
}

CardInfo.propTypes = {
	stream: React.PropTypes.object.isRequired
}

CardInfo.defaultProps = {
	stream: {}
}
