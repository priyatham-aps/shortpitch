import React from "react";
import Link from "./link";

export default class Header extends React.Component {
	render() {
		let closeEl;
		if (this.props.showClose) {
			closeEl = <Link path="/">
				<img className="close-btn" src="/assets/img/close.svg"></img>
			</Link>;
		}
		return <div className="header">
			{closeEl}
		</div>
	}
}

Header.propTypes = {
	showClose: React.PropTypes.bool
}

Header.defaultProps = {
	showClose: false
}
