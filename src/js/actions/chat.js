import * as actiontypes from "./types";

export const addComment = (comment) => {
	return {
		type: actiontypes.ADD_COMMENT,
		comment
	}
}

export const removeComments = () => {
	return {
		type: actiontypes.REMOVE_COMMENTS
	}
}

export const setUserName = (userName) => {
	return {
		type: actiontypes.SET_USERNAME,
		userName
	}
}
