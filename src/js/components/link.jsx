import React from "react";

export default class Link extends React.Component {
	constructor() {
		super();

		this.onClick = this.onClick.bind(this);
	}

	render() {
		return <a href={this.props.path} onClick={this.onClick}>{this.props.children}</a>
	}

	onClick(e) {
		e.preventDefault();
		window.history.pushState(null, null, this.props.path);
		window.dispatchEvent(new window.PopStateEvent('popstate'));
	};
}

Link.propTypes = {
	path: React.PropTypes.string
}

Link.defaultProps = {
	path: "/"
}
