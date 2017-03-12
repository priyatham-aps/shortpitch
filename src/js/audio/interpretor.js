import * as message from ".././fbs/stream"
import {defaultConfig} from "../globals"
import Long from "long"
import {flatbuffers} from "flatbuffers"
//const b = fb.NewBuilder(1024)


export const getStreamBroadCastMessage = (b,streamId, eventId) => {
	let streamIdOffset
	let eventIdOffset
	let streamBroadCastOffset
	let streamMessageOffset
	const timestamp = Long.fromNumber(Date.now())
	const timestampFbLong = flatbuffers.Long.create(timestamp.low, timestamp.high)
	streamIdOffset = b.createString(streamId)
	eventIdOffset = b.createString(eventId)
	message.StreamBroadCast.startStreamBroadCast(b)
	message.StreamBroadCast.addEncoding(b,message.InputEncoding.Opus)
	streamBroadCastOffset = message.StreamBroadCast.endStreamBroadCast(b)
	message.StreamMessage.startStreamMessage(b)
	message.StreamMessage.addEventId(b, eventIdOffset)
	message.StreamMessage.addStreamId(b, streamIdOffset)
	message.StreamMessage.addMessageType(b, message.Message.StreamBroadCast)
	message.StreamMessage.addMessage(b, streamBroadCastOffset)
	message.StreamMessage.addTimestamp(b,timestampFbLong)
	streamMessageOffset = message.StreamMessage.endStreamMessage(b)

	b.finish(streamMessageOffset)
	return b.asUint8Array();
}
export const getStreamFrameMessage = (b,input,streamId, eventId) => {
	const streamIdOffset = b.createString(streamId)
	const eventIdOffset = b.createString(eventId)
	const frameOffset = message.StreamFrame.createFrameVector(b, input)
	const timestamp = Long.fromNumber(Date.now())
	const timestampFbLong = flatbuffers.Long.create(timestamp.low, timestamp.high)

	message.StreamFrame.startStreamFrame(b)
	message.StreamFrame.addFrameSize(b, defaultConfig.codec.frameDuration)
	message.StreamFrame.addSampleRate(b, defaultConfig.codec.sampleRate)
	message.StreamFrame.addChannels(b, defaultConfig.codec.channels)
	message.StreamFrame.addFrame(b, frameOffset)
	const streamFrameOffset = message.StreamFrame.endStreamFrame(b)
	message.StreamMessage.startStreamMessage(b)
	message.StreamMessage.addEventId(b, eventIdOffset)
	message.StreamMessage.addStreamId(b, streamIdOffset)
	message.StreamMessage.addMessageType(b, message.Message.StreamFrame)
	message.StreamMessage.addMessage(b, streamFrameOffset)
	message.StreamMessage.addTimestamp(b,timestampFbLong)
	const streamMessageOffset = message.StreamMessage.endStreamMessage(b)
	b.finish(streamMessageOffset)
	return b.asUint8Array();
}
export const getStreamCommentMessage = (b,input,streamId, eventId,username,comment) => {
	const timestamp = Long.fromNumber(Date.now())
	const timestampFbLong = flatbuffers.Long.create(timestamp.low, timestamp.high)
	const streamIdOffset = b.createString(streamId)
	const eventIdOffset = b.createString(eventId)
	const userNameOffset = b.createString(username)
	const commentOffset = b.createString(comment)
	message.StreamComment.startStreamComment(b)
	message.StreamComment.addUserName(b,userNameOffset)
	message.StreamComment.addText(b,commentOffset)
	streamCommentOffset = message.StreamBroadCast.endStreamComment(b)
	message.StreamMessage.startStreamMessage(b)
	message.StreamMessage.addEventId(b, eventIdOffset)
	message.StreamMessage.addStreamId(b, streamIdOffset)
	message.StreamMessage.addMessageType(b, message.Message.StreamComment)
	message.StreamMessage.addMessage(b, streamCommentOffset)
	message.StreamMessage.addTimestamp(b,timestampFbLong)
	streamMessageOffset = message.StreamMessage.endStreamMessage(b)

	b.finish(streamMessageOffset)
	return b.asUint8Array();
	
}
export const getStreamStopMessage = (b,input,streamId, eventId) => {
	
}
export const getStreamPauseMessage = (b,input,streamId, eventId) => {
	
}