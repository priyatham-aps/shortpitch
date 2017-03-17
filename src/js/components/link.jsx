import React from "react";
import { updatePath } from "../actions/nondispatch";

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
		updatePath(this.props.path);
	};
}

Link.propTypes = {
	path: React.PropTypes.string
}

Link.defaultProps = {
	path: "/"
}
