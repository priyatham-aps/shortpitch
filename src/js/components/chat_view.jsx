import React from "react";

export default class ChatView extends React.Component {
	constructor() {
		super();
		this.state = {
			comment: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.sendComment = this.sendComment.bind(this);
		this.handleEnterKey = this.handleEnterKey.bind(this);
	}

	render() {
		const {comments} = this.props;
		const cmtEls = comments.map((c, i) => <li key={i}><strong>{c.username}</strong> : {c.text}</li>);
		return (
				<div className="chat-container">
					<div className="chat_window">
						<div className="top_menu">
							<div className="title">Live Chat</div>
						</div>
						<ul className="messages">
							{cmtEls}
						</ul>
						<div className="bottom_wrapper clearfix">
							<div className="message_input_wrapper">
								<input onKeyUp={this.handleEnterKey} onChange={this.handleChange}
									className="message_input"
									placeholder="Type your message here..." value={this.state.comment}
									
								/>
							</div>
							<div className="col-md-1 send_message" onClick={this.sendComment}>
								<div className="icon">
									<img src="/assets/img/send.svg"></img>
								</div>
							</div>
						</div>
					</div>
				</div>
		)
	}

	handleChange(e) {
		this.setState({
			comment: e.target.value
		});
	}

	handleEnterKey(e) {
		if (e.key == "Enter"){
			this.sendCommentWithoutEvent()
		}
	}
	
	sendComment(e) {
		e.preventDefault();
		if (this.state.comment) {
			this.props.sendComment(this.state.comment);
		}

		this.setState({
			comment: ""
		});
	}
	sendCommentWithoutEvent() {
		if (this.state.comment) {
			this.props.sendComment(this.state.comment);
		}
		this.setState({
			comment: ""
		});
	}
}

ChatView.propTypes = {
	comments: React.PropTypes.array.isRequired,
	sendComment: React.PropTypes.func.isRequired
}

ChatView.defaultProps = {
	comments: []
}
