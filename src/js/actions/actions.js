import * as api from "../api/api"
import {SET_PITCHER, REMOVE_PITCHER, SET_STREAMS} from "./types"

export const setStreamId = (id) => {
	return {
		type: "SET_PITCHER",
		id: id
	}
}

export const removeStreamId = () => {
	return {
		type: "REMOVE_PITCHER"
	}
}

export const receiveStreams = (streams) => {
	return {
		type: "SET_STREAMS",
		streams: streams
	}
}

export const createStream = () => {
	return dispatch => {
		return api.createStream()
		.then(json => dispatch(setStreamId(json.id)))
	}
}

export const getStreams = () => {
	return dispatch => {
		return api.fetchStreams()
		.then(json => dispatch(receiveStreams(json)))
	}
}
