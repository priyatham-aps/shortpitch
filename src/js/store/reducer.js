import { combineReducers } from "redux";
import * as actiontypes from "../actions/types"
import { parsePath } from "./utils";

const pitcher = (state = {}, action) => {
	switch(action.type) {
		case actiontypes.SET_PITCHER:
			return action.stream
		case actiontypes.REMOVE_PITCHER:
			return {};
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

const eventInfo = (state={}, action) => {
	switch (action.type) {
		case actiontypes.RECEIVE_EVENT_INFO:
			return action.eventInfo
		default:
			return state;
	}
}

const comments = (state=[], action) => {
	switch (action.type) {
		case actiontypes.ADD_COMMENT:
			return [
				...state,
				action.comment
			];
		case actiontypes.REMOVE_COMMENTS:
			return [];
		default:
			return state;
	}
}

const streamInfo = (state={}, action) => {
	switch (action.type) {
		case actiontypes.SET_STREAM_INFO:
			return action.payload;
		case actiontypes.SET_STREAM_ACTIVE_COUNT:
			return Object.assign({}, state, {activeCount: action.count});
		default:
			return state;
	}
}

const currentPath = (state={}, action) => {
	switch (action.type) {
		case actiontypes.SET_CURRENT_PATH:
			return parsePath(action.path);
		default:
			return state;
	}
}

const userName = (state="", action) => {
	switch (action.type) {
		case actiontypes.SET_USERNAME:
			return action.userName
		default:
			return state;
	}
}

const reducer = combineReducers({
	pitcher,
	events,
	eventInfo,
	streams,
	streamInfo,
	comments,
	currentEvent,
	currentPath,
	userName
});

export default reducer;
