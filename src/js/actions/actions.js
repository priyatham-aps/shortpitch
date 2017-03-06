import * as api from "../api/api"
import {SET_PITCHER, REMOVE_PITCHER, RECEIVE_STREAMS, RECEIVE_STREAM_SERVER} from "./types"

export const setPitcher = (id) => {
	return {
		type: SET_PITCHER,
		id
	}
}

export const removePitcher = () => {
	return {
		type: REMOVE_PITCHER
	}
}

export const receiveStreams = (streams) => {
	return {
		type: RECEIVE_STREAMS,
		streams
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

export const createEvent = () => {
	return dispatch => {
		return api.createEvent()
		.then(json => dispatch())
	}
}
