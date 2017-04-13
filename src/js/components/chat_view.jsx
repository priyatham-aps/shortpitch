import React from "react";
import {setUserName} from "../actions/actions";
import store from "../store/store"

export default class ChatView extends React.Component {
	constructor() {
		super();
		this.state = {
			comment: "",
			uncolor: this.getRandomColor()
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSend = this.handleSend.bind(this);
		this.handleEnterKey = this.handleEnterKey.bind(this);
		this.handleUserNameChange = this.handleUserNameChange.bind(this);
		this.handleUserNameEnter = this.handleUserNameEnter.bind(this);
	}

	getRandomColor() {
	    let letters = '0123456789ABCDEF';
	    let color = '#';
	    for (let i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}


	componentDidUpdate(prevProps) {
		if (this.props.comments !== prevProps.comments) {
			this.scrollTop();
		}
	}

	render() {
		const {comments} = this.props;
		let placeholdertext = "Chat here"
		const cmtEls = comments.map((c, i) => <li key={i}><span style={{color: `${this.state.uncolor}`}}>{c.username}</span> : {c.text}</li>);
		if(this.props.userName === "") {
			placeholdertext= "Please set a username to join chat."
		}
		return (
				<div className="chat-container">
					<div className="chat_window">
						<div className="top_menu">
							<div className="title">Live Chat</div>
							<div className="message_input_wrapper">
								<div className="title">Username: </div>
								<input value={this.props.userName}
									onChange={this.handleUserNameChange}
									onKeyUp={this.handleUserNameEnter}
									className="message_input"
								/>
							</div>
						</div>
						<ul className="messages" ref={(ul) => this.ul = ul}>
							{cmtEls}
						</ul>
						<div className="bottom_wrapper clearfix">
							<div className="message_input_wrapper">
								<input disabled={this.props.userName === ""}
									onKeyUp={this.handleEnterKey}
									onChange={this.handleChange}
									className="message_input"
									placeholder={placeholdertext}
									value={this.state.comment}
									ref={(input) => this.cmtinput = input}
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
		store.dispatch(setUserName(e.target.value));
	}

	handleUserNameEnter(e) {
		if (e.key == "Enter") {
			this.cmtinput.focus();
		}
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
			this.props.sendComment(this.props.userName, this.state.comment);
			this.setState({
				comment: ""
			});
		}
	}

	scrollTop() {
		this.ul.scrollTop = this.ul.scrollHeight;
	}
}

ChatView.propTypes = {
	comments: React.PropTypes.array.isRequired,
	sendComment: React.PropTypes.func.isRequired,
	userName: React.PropTypes.string
}

ChatView.defaultProps = {
	comments: [],
	userName: ""
}
