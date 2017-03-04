import React from "react";
import ReactDOM from "react-dom";
import store from "../store/store"
import Player from "../audio/player";

export default class PlayableCard extends React.Component {
	constructor() {
		super();
		this.state = {
			isStreamPlaying:false
		};
	}
	componentWillUpdate(nextProps, nextState) {
		this.player = new Player(nextProps.streamId);
	}

	render() {
		let button
		let randomPicRemoveLater = "http://www.livemint.com/rf/Image-621x414/LiveMint/Period1/2011/10/25/Photos/bdad2f99-acf4-4399-b603-73a77810042e.jpg"
		console.log(this.props.streamId);
		let sub_url = "http://localhost:8000/stream/http/subscribe/"+this.props.streamId 
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
					 <div>
					 	<audio controls> 
					 		<source type="audio/ogg" src={sub_url}></source>
					 	</audio>
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
