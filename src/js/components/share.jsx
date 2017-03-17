import React from "react";
import { ShareButtons, generateShareIcon } from 'react-share';

const {FacebookShareButton} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');

export default class Share extends React.Component {
	render() {
		const shareUrl = window.location.href;
		const title = "Shortpitch!";

		return <div>
			<span>Share via: </span>
			<FacebookShareButton
				url={shareUrl}
				title={title}>
					<FacebookIcon size={32} round />
			</FacebookShareButton>
		</div>
	}
}
