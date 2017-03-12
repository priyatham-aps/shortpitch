import React from "react";

export default class ChatView extends React.Component {
	render() {
		return ( 
				<div className="chat-container">
					<div className="chat _window">
						<div className="top_menu">
							<div className="buttons">
								<div className="button close"></div>
							</div>
							<div className="title">Chat</div>
						</div>
						<ul className="messages"></ul>
						<div className="bottom_wrapper clearfix">
							<div className="message_input_wrapper">
								<input className="message_input" placeholder="Type your message here..." />
							</div>
							<div className="send_message">
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
}
