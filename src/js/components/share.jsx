import React from "react";
import { ShareButtons, generateShareIcon } from 'react-share';

const { FacebookShareButton, TwitterShareButton } = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

export default class Share extends React.Component {
	render() {
		const title = "Shortpitch!";

		return <div>
			<FacebookShareButton
				url={this.props.url}
				title={title}
				className="padding-vertical-5px">
					<FacebookIcon size={32} round />
			</FacebookShareButton>
			<TwitterShareButton
				url={this.props.url}
				title={title}
				className="padding-vertical-5px">
					<TwitterIcon size={32} round />
			</TwitterShareButton>
		</div>
	}
}

Share.propTypes = {
	url: React.PropTypes.string
}

Share.defaultProps = {
	url: window.location.href
}
