import React from "react";
import { ShareButtons, generateShareIcon } from 'react-share';

const { FacebookShareButton, TwitterShareButton } = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

export default class Share extends React.Component {
	render() {
		const title = "Shortpitch!";

		return <div className={this.props.horizontal ? "row" : ""}>
			<FacebookShareButton
				url={this.props.url}
				title={title}
				className={this.props.horizontal ? "col-xs-1 col-xs-offset-5" : "share-vertical"}>
					<FacebookIcon size={32} round />
			</FacebookShareButton>
			<TwitterShareButton
				url={this.props.url}
				title={title}
				className={this.props.horizontal ? "col-xs-1" : "share-vertical"}>
					<TwitterIcon size={32} round />
			</TwitterShareButton>
		</div>
	}
}

Share.propTypes = {
	url: React.PropTypes.string,
	horizontal: React.PropTypes.bool
}

Share.defaultProps = {
	url: window.location.href,
	horizontal: false
}
