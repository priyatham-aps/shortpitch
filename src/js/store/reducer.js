import { combineReducers } from "redux";
import * as actiontypes from "../actions/types"

const pitcher = (state = "", action) => {
	switch(action.type) {
		case actiontypes.SET_PITCHER:
			return action.id
		case actiontypes.REMOVE_PITCHER:
			return ""
		default:
			return state
	}
}

const streams = (state=[], action) => {
	switch (action.type) {
		case actiontypes.RECEIVE_STREAMS:
			return action.streams;
		default:
			return state;
	}
}

const events = (state=[], action) => {
	switch (action.type) {
		case actiontypes.RECEIVE_EVENTS:
			return action.events;
		default:
			return state;
	}
}

const currentEvent = (state="", action) => {
	switch (action.type) {
		case actiontypes.SELECT_CURRENT_EVENT:
			return action.eventId;
		default:
			return state;
	}
}

const reducer = combineReducers({
	pitcher,
	streams,
	events,
	currentEvent
});

export default reducer;
