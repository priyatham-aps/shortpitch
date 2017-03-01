import {STREAM_SERVER} from "../globals"

export const getStreamerSocket = (streamId) => {
	const url = `${STREAM_SERVER}/stream/ws/publish/${streamId}`
	return new WebSocket(url)
}
