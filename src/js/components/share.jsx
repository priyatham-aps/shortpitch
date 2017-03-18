import React from "react";
import { ShareButtons, generateShareIcon } from 'react-share';

const { FacebookShareButton, TwitterShareButton } = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

export default class Share extends React.Component {
	render() {
		const title = "Shortpitch!";
		let className = "share-vertical";
		if (this.props.horizontal) {
			className = "share-horizontal";
		}

		return <div>
			<FacebookShareButton
				url={this.props.url}
				title={title}
				className={className}>
					<FacebookIcon size={32} round />
			</FacebookShareButton>
			<TwitterShareButton
				url={this.props.url}
				title={title}
				className={className}>
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
