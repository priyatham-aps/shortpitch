import React from "react";
import store from "../store/store";
import {getEventInfo} from "../actions/actions"


export default class EventInfo extends React.Component {
	componentDidMount() {
	 	 store.dispatch(getEventInfo(this.props.event.id));
	 	 window.setInterval(()=>store.dispatch(getEventInfo(this.props.event.id)),30000);
	}

	render() {
		const {event,eventInfo} = this.props;
		let score,scoreDiv,oversDiv,flag1,flag2,flag1_img,flag2_img,batsman1,batsman2,prevInnScoreDiv,prevInnOversDiv,status
		if(eventInfo){
			if(eventInfo.MatchInfo){
				score = eventInfo.MatchInfo.Score;
				flag1 = score.BattingTeam.SName
				flag2 = score.BowlingTeam.SName
				flag1_img = <img className="sp-flags" src={"assets/img/flags/"+flag1+".png"}/>
				flag2_img = <img className="sp-flags" src={"/assets/img/flags/"+flag2+".png"}/>
				batsman1 = <div className="batsmen">{score.Batsmen[0].SName} &nbsp; {score.Batsmen[0].Runs}</div>
				batsman2 = <div className="batsmen">{score.Batsmen[1].SName} &nbsp; {score.Batsmen[1].Runs}</div>
				//batsman1 = <div className="batsmen">{score.Batsmen.SName} &nbsp; {score.Batsmen[0].Runs}</div>
				if(score){
					scoreDiv = <div className={"currentScore "+ this.props.textclass}>{score.BattingTeam.Innings[0].Runs}/{score.BattingTeam.Innings[0].Wickets}</div>
					oversDiv = <div className={"currentOvers "+ this.props.textclass}>{score.BattingTeam.Innings[0].Overs} Overs</div>
					if(score.BowlingTeam.Innings){
						prevInnScoreDiv = <div className="prevScore">{score.BowlingTeam.Innings[0].Runs}/{score.BowlingTeam.Innings[0].Wickets}</div>
						prevInnOversDiv = <div className="prevOvers">{score.BowlingTeam.Innings[0].Overs} Overs</div>
					}

				}
			}
		}

		if(this.props.showstatus){
			if(eventInfo && eventInfo.MatchInfo && eventInfo.MatchInfo.MatchState){
					status = <div className="matchStatus">{eventInfo.MatchInfo.MatchState.Status}</div>
			}
		}
		return <div>
					<div className="sp-score-parent">
						<div className="sp-score-child">
							<span>
								<div className="sp-fl flag-parent">
									{flag1_img}
									<div className="sp-flag-names ">{flag1}</div>
									{batsman1}
									{batsman2}
								</div>
								<div className="sp-fl sp-main-score">
									{scoreDiv}
									{oversDiv}

							   	</div>
							   	<div className="sp-fl flag-parent">
							   		{flag2_img}
							   		<div className="sp-flag-names">{flag2}</div>
							   		{prevInnScoreDiv}
							   		{prevInnOversDiv}

							   	</div>
						 	</span>
						</div>
				    </div>
				    <br/>
				    <br/>
				    {status}
			  	</div>

	}
}

EventInfo.propTypes = {
	event: React.PropTypes.object
}

EventInfo.defaultProps = {
	event: {}
}
