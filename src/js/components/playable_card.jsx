import React from "react";
import ReactDOM from "react-dom";
import store from "../store/store"
import Player from "../audio/player";

export default class PlayableCard extends React.Component {
	constructor(props) {
		super(props);
		this.player = new Player(this.props.streamId)
		this.state = {
			isStreamPlaying:false
		};
	}
	

	render() {
		let button
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
					 	<div className="col-md-3 sp-img-container" style={{backgroundImage:"url('http://www.opindia.com/wp-content/uploads/2016/04/harsha.jpg')"}}>
					 	</div>
					 	<div className="col-md-6">

					 	</div>
					 	<div className="col-md-2">

					 	</div>
					 	<div className="col-md-1">

					 	</div>

					 </div>
			</div>
		)
	}

	killStream(){
		console.log("killing stream")
		this.player.stop()
		this.setState({isStreamPlaying : false})
	}

	playStream(){
		console.log("starting stream")
		this.player.start()
		this.setState({isStreamPlaying : true})
	}
}
