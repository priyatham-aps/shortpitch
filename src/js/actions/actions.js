import * as api from "../api/api"
import * as actiontypes from "./types";

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

export const receiveEventInfo = (eventInfo) => {
	return {
		type: actiontypes.RECEIVE_EVENT_INFO,
		eventInfo
	}
}

export const selectCurrentEvent = (eventId) => {
	return {
		type: actiontypes.SET_CURRENT_EVENT,
		eventId
	}
}

export const setStreamActiveCount = (count) => {
	return {
		type: actiontypes.SET_STREAM_ACTIVE_COUNT,
		count
	}
}

export const setCurrentPath = (path) => {
	return {
		type: actiontypes.SET_CURRENT_PATH,
		path
	}
}

/***************************/
// Action Thunks
/***************************/

export const getStreams = (eId) => {
	return dispatch => {
		return api.fetchStreams(eId)
		.then(json => dispatch(receiveStreams(json.data)))
	}
}
export const getEventInfo = (eId) => {
	return dispatch => {
		return api.fetchEventInfo(eId)
		.then(json => dispatch(receiveEventInfo(json.data)))
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
