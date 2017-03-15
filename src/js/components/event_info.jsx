import React from "react";
import store from "../store/store";
import {getEventInfo} from "../actions/actions"


export default class EventInfo extends React.Component {
	componentDidMount() {
		store.dispatch(getEventInfo(this.props.event.id));
	}

	render() {
		const {event,eventInfo} = this.props;
		let score,scoreDiv,oversDiv,flag1,flag2,flag1_img,flag2_img
		if(eventInfo){
			if(eventInfo.MatchInfo){
				flag1 = eventInfo.MatchInfo.Team[0].SName
				flag2 = eventInfo.MatchInfo.Team[1].SName
				flag1_img = <img className="sp-flags" src={"assets/img/flags/"+flag1+".png"}/>
				flag2_img = <img className="sp-flags" src={"/assets/img/flags/"+flag2+".png"}/>
				score = eventInfo.MatchInfo.Score;
				scoreDiv = <div className="currentScore">{score.BattingTeam.Innings[0].Runs}/{score.BattingTeam.Innings[0].Wickets}</div>
				if(score){
					scoreDiv = <div className="currentScore">{score.BattingTeam.Innings[0].Runs}/{score.BattingTeam.Innings[0].Wickets}</div>
					oversDiv = <div className="currentOvers">{score.BattingTeam.Innings[0].Overs} Overs</div>
				}
			}
		}
		if(eventInfo && eventInfo.MatchInfo && eventInfo.MatchInfo.MatchState){
				status = eventInfo.MatchInfo.MatchState.Status
		}
		return <div className="sp-score-parent">
				<div className="sp-score-child">
					<span>
						<div className="sp-fl flag-parent">
							{flag1_img}
							<div className="sp-flag-names ">{flag1}</div>
						</div>
						<div className="sp-fl sp-main-score">
							{scoreDiv}
							{oversDiv}
					   	</div>
					   	<div className="sp-fl flag-parent">
					   		{flag2_img}
					   		<div className="sp-flag-names">{flag2}</div>
					   		
					   	</div>
				 	</span>
				</div>
			   </div>

	}
}

EventInfo.propTypes = {
	event: React.PropTypes.object
}

EventInfo.defaultProps = {
	event: {}
}
