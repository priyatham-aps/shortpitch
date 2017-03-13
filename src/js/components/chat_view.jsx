import React from "react";

export default class ChatView extends React.Component {
	constructor() {
		super();
		this.state = {
			comment: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.sendComment = this.sendComment.bind(this);
	}

	render() {
		const {comments} = this.props;
		const cmtEls = comments.map((c) => <li>{c.username} : {c.text}</li>);
		return (
				<div className="chat-container">
					<div className="chat _window">
						<div className="top_menu">
							<div className="buttons">
								<div className="button close"></div>
							</div>
							<div className="title">Chat</div>
						</div>
						<ul className="messages">
							{cmtEls}
						</ul>
						<div className="bottom_wrapper clearfix">
							<div className="message_input_wrapper">
								<input
									className="message_input"
									placeholder="Type your message here..."
									value={this.state.comment}
									onChange={this.handleChange}
								/>
							</div>
							<div className="send_message" onClick={this.sendComment}>
								<div className="icon"></div>
								<div className="text">Send</div>
							</div>
						</div>
					</div>
					<div className="message_template">
						<li className="message">
							<div className="avatar"></div>
							<div className="text_wrapper">
								<div className="text"></div>
							</div>
						</li>
					</div>
				</div>
		)
	}

	handleChange(e) {
		this.setState({
			comment: e.target.value
		});
	}

	sendComment(e) {
		e.preventDefault();

		if (this.state.comment) {
			this.props.sendComment(this.state.comment);
		}
	}
}

ChatView.propTypes = {
	comments: React.PropTypes.array.isRequired,
	sendComment: React.PropTypes.func.isRequired
}

ChatView.defaultProps = {
	comments: []
}
