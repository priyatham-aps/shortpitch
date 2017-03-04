import { combineReducers } from "redux";
import {SET_PITCHER, REMOVE_PITCHER, SET_STREAMS} from "../actions/types"

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

const streams = (state, action) => {
	switch (action.type) {
		case SET_STREAMS:

			break;
		default:

	}
}

const reducer = combineReducers({
	pitcher
});

export default reducer;
