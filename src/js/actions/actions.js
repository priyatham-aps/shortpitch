export const setStreamId = (id) => {
	return {
		type: "SET",
		id: id
	}
}

export const removeStreamId = () => {
	return {
		type: "REMOVE"
	}
}
