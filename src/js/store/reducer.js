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
		case actiontypes.SET_CURRENT_EVENT:
			return action.eventId;
		default:
			return state;
	}
}

const currentStream = (state="", action) => {
	switch (action.type) {
		case actiontypes.SET_CURRENT_STREAM:
			return action.streamId;
		case actiontypes.STOP_CURRENT_STREAM:
			if (state === action.streamId) {
				return "";
			}
			// TODO: Remove
			console.info(`Trying to stop stream ${state}, but sent ${action.streamId}`);
			return state;
		default:
			return state;
	}
}

const currentView = (state="", action) => {
	switch (action.type) {
		case actiontypes.SET_CURRENT_VIEW:
			return action.currentView;
		default:
			return state;
	}
}

const reducer = combineReducers({
	pitcher,
	events,
	streams,
	currentEvent,
	currentStream,
	currentView
});

export default reducer;
