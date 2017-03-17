import React from "react";
import { ShareButtons, generateShareIcon } from 'react-share';

const { FacebookShareButton, TwitterShareButton } = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

export default class Share extends React.Component {
	render() {
		const shareUrl = window.location.href;
		const title = "Shortpitch!";

		return <div>
			<FacebookShareButton
				url={shareUrl}
				title={title}>
					<FacebookIcon size={32} round />
			</FacebookShareButton>
			<TwitterShareButton
				url={shareUrl}
				title={title}>
					<TwitterIcon size={32} round />
			</TwitterShareButton>
		</div>
	}
}
