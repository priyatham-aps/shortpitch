import * as audio from "./audio";
import * as actions from "./actions";
import { removeComments } from "./chat";
import * as actiontypes from "./types";
import { SUBSCRIBE_VIEW } from '../components/views';

export const startPlaying = (sId, eId) => {
	return dispatch => {
		audio.startPlaying(sId, eId);
	}
}

export const stopPlaying = (sId, eId) => {
	return dispatch => {
		audio.stopPlaying(sId, eId);
		dispatch(removeComments());
	}
}

export const setStreamInfo = (status, count) => {
	return {
		type: actiontypes.SET_STREAM_INFO,
		payload: {
			status,
			count
		}
	}
}
