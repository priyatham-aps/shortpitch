import * as api from "../api/api"
import * as audio from "./audio";
import * as actions from "./actions";
import { removeComments } from "./chat";
import * as actiontypes from "./types";
import { SUBSCRIBE_VIEW } from '../components/views'
import { updatePath } from "./nondispatch";
import { LOGIN_VIEW } from '../components/views'

export const setPitcher = (stream) => {
	return {
		type: actiontypes.SET_PITCHER,
		stream
	}
}

export const removePitcher = (id) => {
	return {
		type: actiontypes.REMOVE_PITCHER
	}
}

export const removeStreamInfo = () => {
	return {
		type: actiontypes.SET_STREAM_INFO,
		payload: {}
	}
}

export const startPitching = (eId) => {
	return dispatch => {
		return api.createStream(eId)
		.then(json => {
			dispatch(setPitcher(json));
			audio.startStreaming(json.id, eId);
		})
		.catch(error => {
			console.error(error);
			updatePath("login");
		})
	}
}

export const stopPitching = (sId, eId) => {
	return dispatch => {
		audio.stopStreaming(sId, eId);
		dispatch(removePitcher());
		dispatch(removeStreamInfo());
		dispatch(removeComments());
	}
}
