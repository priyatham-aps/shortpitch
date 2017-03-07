import React from "react";
import ReactDOM from "react-dom";
import store from "../store/store"
import Player from "../audio/player";

export default class PlayableCard extends React.Component {
	constructor(props) {
		super(props);
		this.player = new Player(this.props.stream.id)
		this.state = {
			isStreamPlaying:false
		};
	}
	

	render() {
		let button
		var backgroundImageLoc = "url('//graph.facebook.com/"+this.props.stream.user.fbid+"/picture?type=large')"
		if (this.state.isStreamPlaying) {
			button = <button className="btn btn-primary margin-10px" onClick={()=>this.killStream()}>Stop</button>;
		} else {
			button =  <button className="btn btn-primary margin-10px" onClick={()=>this.playStream()}>Play</button>;
		}
		return (
			<div className="sp-slat">
					 <div className="sp-play-pause">
					 	{button}
					 </div>
					 <div className="col-md-10 sp-meta-container">
					 	<div className="col-md-3 sp-img-container" >
					 		<div className="sp-user-profile " style={{backgroundImage:backgroundImageLoc}}></div>
					 		<h6>{this.props.stream.user.nickname}</h6>
					 	</div>
					 	
					 	<div className="col-md-6">

					 	</div>
					 	<div className="col-md-2">
					 		{this.props.stream.subscriber_count}
					 		<p>Listeners</p>
					 	</div>
					 	<div className="col-md-1">

					 	</div>

					 </div>
			</div>
		)
	}

	killStream(){
		this.player.stop()
		this.setState({isStreamPlaying : false})
	}

	playStream(){
		this.player.start()
		this.setState({isStreamPlaying : true})
	}
}
