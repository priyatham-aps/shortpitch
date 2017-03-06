import * as api from "../api/api"
import * as actiontypes from "./types"

export const setPitcher = (id) => {
	return {
		type: actiontypes.SET_PITCHER,
		id
	}
}

export const removePitcher = () => {
	return {
		type: actiontypes.REMOVE_PITCHER
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
		type: actiontypes.SELECT_CURRENT_EVENT,
		eventId
	}
}

/***************************/
// Action Thunks
/***************************/

export const createStream = () => {
	return dispatch => {
		return api.createStream()
		.then(json => dispatch(setPitcher(json.id)))
	}
}

export const getStreams = () => {
	return dispatch => {
		return api.fetchStreams()
		.then(json => dispatch(receiveStreams(json.data)))
	}
}

export const fetchEvents = () => {
	return dispatch => {
		return api.fetchEvents()
		.then(json => dispatch(receiveEvents(json.data)));
	}
}
