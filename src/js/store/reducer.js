import { combineReducers } from "redux";
import {SET_PITCHER, REMOVE_PITCHER, RECEIVE_STREAMS, RECEIVE_STREAM_SERVER} from "../actions/types"

const pitcher = (state = "", action) => {
	switch(action.type) {
		case SET_PITCHER:
			return action.id
		case REMOVE_PITCHER:
			return ""
		default:
			return state
	}
}

const streams = (state=[], action) => {
	switch (action.type) {
		case RECEIVE_STREAMS:
			return action.streams;
		default:
			return state;
	}
}

const reducer = combineReducers({
	pitcher,
	streams
});

export default reducer;
