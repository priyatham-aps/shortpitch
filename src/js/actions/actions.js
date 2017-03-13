import * as api from "../api/api"
import * as actiontypes from "./types";
import {LOGIN_VIEW} from '../components/views'
import * as audio from "./audio";

export const setPitcher = (id) => {
	return {
		type: actiontypes.SET_PITCHER,
		id
	}
}

export const removePitcher = (id) => {
	return {
		type: actiontypes.REMOVE_PITCHER,
		id
	}
}

export const receiveStreams = (streams) => {
	return {
		type: actiontypes.RECEIVE_STREAMS,
		streams
	}
}

export const receiveEvents = (events) => {
	return {
		type: actiontypes.RECEIVE_EVENTS,
		events
	}
}

export const selectCurrentEvent = (eventId) => {
	return {
		type: actiontypes.SET_CURRENT_EVENT,
		eventId
	}
}

export const setCurrentView = (currentView) => {
	return {
		type: actiontypes.SET_CURRENT_VIEW,
		currentView
	}
}

export const setCurrentStream = (streamId) => {
	return {
		type: actiontypes.SET_CURRENT_STREAM,
		streamId
	}
}

export const removeCurrentStream = (streamId) => {
	return {
		type: actiontypes.STOP_CURRENT_STREAM,
		streamId
	}
}

export const addComment = (comment) => {
	return {
		type: actiontypes.ADD_COMMENT,
		comment
	}
}

/***************************/
// Action Thunks
/***************************/

export const startPitching = (eId) => {
	return dispatch => {
		return api.createStream(eId)
		.then(json => {
			dispatch(setPitcher(json.id));
			audio.startStreaming(json.id, eId);
		})
		.catch(error => dispatch(setCurrentView(LOGIN_VIEW)))
	}
}

export const getStreams = (eId) => {
	return dispatch => {
		return api.fetchStreams(eId)
		.then(json => dispatch(receiveStreams(json.data)))
	}
}

export const fetchEvents = () => {
	return dispatch => {
		return api.fetchEvents()
		.then(json => {
			dispatch(receiveEvents(json.data));
			if (json.data && json.data[0]) {
				dispatch(selectCurrentEvent(json.data[0].id));
			}
		});
	}
}

export const fetchEventAndStreams = () => {
	return (dispatch, getState) => {
		return dispatch(fetchEvents()).then(() => {
			if (getState().currentEvent) {
				dispatch(getStreams(getState().currentEvent));
			}
		});
	}
}

/***************************/
// Impure Actions
/***************************/
export const stopPitching = (sId, eId) => {
	return dispatch => {
		console.log(sId);
		console.log(eId);
		audio.stopStreaming(sId, eId);
		dispatch(removePitcher(sId));
	}
}

export const startPlaying = (sId) => {
	return dispatch => {
		audio.startPlaying(sId);
		dispatch(setCurrentStream(sId));
	}
}

export const stopPlaying = (sId) => {
	return dispatch => {
		audio.stopPlaying(sId);
		dispatch(removeCurrentStream(sId));
	}
}
