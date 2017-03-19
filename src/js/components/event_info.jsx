import React from "react";
import store from "../store/store";
import {getEventInfo} from "../actions/actions";

export default class EventInfo extends React.Component {
	componentDidMount() {
		if (this.props.event && this.props.event.id) {
			store.dispatch(getEventInfo(this.props.event.id));
			this._intervalId = window.setInterval(()=>store.dispatch(getEventInfo(this.props.event.id)),30000);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.event !== prevProps.event && this.props.event && this.props.event.id) {
			if (this._intervalId) {
				window.clearInterval(this._intervalId);
			}

			store.dispatch(getEventInfo(this.props.event.id));
			this._intervalId = window.setInterval(()=>store.dispatch(getEventInfo(this.props.event.id)),30000);
		}
	}

	render() {
		const {event,eventInfo} = this.props;
		let matchDesc,scoreDiv,oversDiv,flag1,flag2,flag1_img,flag2_img,teamInfo1,teamInfo2,status
		if(eventInfo && eventInfo.MatchInfo) {
			const matchInfo = eventInfo.MatchInfo;
			const score = matchInfo.Score;
			const team1 = matchInfo.Team[0];
			const team2 = matchInfo.Team[1];

			matchDesc = <div className="match-desc">{`${matchInfo.MatchDesc} ${matchInfo.MatchNumber}`}</div>

			flag1 = team1.SName
			flag2 = team2.SName
			flag1_img = <img className="sp-flags" src={"/assets/img/flags/"+flag1+".png"}/>
			flag2_img = <img className="sp-flags" src={"/assets/img/flags/"+flag2+".png"}/>
			if(score){
				let batsman1, batsman2;
				if (score.Batsmen && score.Batsmen[0]) {
					batsman1 = <div className="batsmen">{score.Batsmen[0].SName} &nbsp; {score.Batsmen[0].Runs}</div>
				}
				if (score.Batsmen && score.Batsmen[1]) {
					batsman2 = <div className="batsmen">{score.Batsmen[1].SName} &nbsp; {score.Batsmen[1].Runs}</div>
				}

				let prevInnScoreDiv, prevInnOversDiv;
				if (score.BowlingTeam.Innings && score.BowlingTeam.Innings.length) {
					const lastInnings = score.BowlingTeam.Innings.length - 1;
					prevInnScoreDiv = <div className="prevScore">{score.BowlingTeam.Innings[lastInnings].Runs}/{score.BowlingTeam.Innings[lastInnings].Wickets}</div>
					prevInnOversDiv = <div className="prevOvers">{score.BowlingTeam.Innings[lastInnings].Overs} Overs</div>
				}

				if (score.BattingTeam && score.BattingTeam.SName === team1.SName) {
					teamInfo1 = <div>
						{batsman1}
						{batsman2}
					</div>;
					teamInfo2 = <div>
						{prevInnScoreDiv}
						{prevInnOversDiv}
					</div>;
				} else {
					teamInfo1 = <div>
						{prevInnScoreDiv}
						{prevInnOversDiv}
					</div>;
					teamInfo2 = <div>
						{batsman1}
						{batsman2}
					</div>;
				}

				scoreDiv = <div className={"currentScore "+ this.props.textclass}>{score.BattingTeam.Innings[0].Runs}/{score.BattingTeam.Innings[0].Wickets}</div>
				oversDiv = <div className={"currentOvers "+ this.props.textclass}>{score.BattingTeam.Innings[0].Overs} Overs</div>
			}
		}

		if(this.props.showstatus){
			if(eventInfo && eventInfo.MatchInfo && eventInfo.MatchInfo.MatchState){
					status = <div className="matchStatus">{eventInfo.MatchInfo.MatchState.Status}</div>
			}
		}
		return <div className="event-info">
			{matchDesc}
			<div className="row">
				<div className="col-xs-4 flag-parent">
					{flag1_img}
					<div className="sp-flag-names ">{flag1}</div>
					{teamInfo1}
				</div>
				<div className="col-xs-4 sp-main-score">
					{scoreDiv}
					{oversDiv}
				</div>
				<div className="col-xs-4 flag-parent">
					{flag2_img}
					<div className="sp-flag-names">{flag2}</div>
					{teamInfo2}
				</div>
			</div>
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
