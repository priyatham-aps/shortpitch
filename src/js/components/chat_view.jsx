import React from "react";

export default class ChatView extends React.Component {
	constructor() {
		super();
		this.state = {
			comment: "",
			username:""
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSend = this.handleSend.bind(this);
		this.handleEnterKey = this.handleEnterKey.bind(this);
		this.handleUserNameChange = this.handleUserNameChange.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (this.props.comments !== prevProps.comments) {
			this.scrollTop();
		}
	}

	render() {
		const {comments} = this.props;
		const cmtEls = comments.map((c, i) => <li key={i}><strong>{c.username}</strong> : {c.text}</li>);
		return (
				<div className="chat-container">
					<div className="chat_window">
						<div className="top_menu">
							<div className="title">Live Chat</div>
							<div className="message_input_wrapper">
								<div className="title">Username: </div>
								<input onChange={this.handleUserNameChange}
										className="message_input"
										placeholder="" value={this.state.username}

									/>
							</div>
						</div>
						<ul className="messages" ref={(ul) => this.ul = ul}>
							{cmtEls}
						</ul>
						<div className="bottom_wrapper clearfix">
							<div className="message_input_wrapper">
								<input onKeyUp={this.handleEnterKey} onChange={this.handleChange}
									className="message_input"
									placeholder="Type @@username# to set your username" value={this.state.comment}

								/>
							</div>
							<div className="col-md-1 send_message" onClick={this.handleSend}>
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
	handleUserNameChange(e) {
			this.setState({
				username: e.target.value
			});
	}

	handleEnterKey(e) {
		if (e.key == "Enter"){
			this.sendComment()
		}
	}

	handleSend(e) {
		e.preventDefault();
		this.sendComment();
	}

	sendComment() {
		if (this.state.comment) {
			this.props.sendComment(this.state.username,this.state.comment);
		}
		this.setState({
			comment: ""
		});
	}

	scrollTop() {
		this.ul.scrollTop = this.ul.scrollHeight;
	}
}

ChatView.propTypes = {
	comments: React.PropTypes.array.isRequired,
	sendComment: React.PropTypes.func.isRequired
}

ChatView.defaultProps = {
	comments: []
}
