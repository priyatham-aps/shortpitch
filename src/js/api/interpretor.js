import * as message from ".././fbs/stream"
import {defaultConfig} from "../globals"
import Long from "long"
import {flatbuffers} from "flatbuffers";

export const getBroadCastMessage = (streamId, eventId) => {
	const b = new flatbuffers.Builder(1024)
	const timestamp = Long.fromNumber(Date.now())
	const timestampFbLong = flatbuffers.Long.create(timestamp.low, timestamp.high)
	const streamIdOffset = b.createString(streamId)
	const eventIdOffset = b.createString(eventId)

	message.BroadCast.startBroadCast(b)
	message.BroadCast.addEncoding(b,message.InputEncoding.Opus)
	const broadCastOffset = message.BroadCast.endBroadCast(b)

	message.StreamMessage.startStreamMessage(b)
	message.StreamMessage.addEventId(b, eventIdOffset)
	message.StreamMessage.addStreamId(b, streamIdOffset)
	message.StreamMessage.addMessageType(b, message.Message.BroadCast)
	message.StreamMessage.addMessage(b, broadCastOffset)
	message.StreamMessage.addTimestamp(b,timestampFbLong)
	const streamMessageOffset = message.StreamMessage.endStreamMessage(b)

	b.finish(streamMessageOffset)
	return b.asUint8Array();
}

export const getFrameMessage = (input, streamId, eventId) => {
	const b = new flatbuffers.Builder(1024)

	const streamIdOffset = b.createString(streamId)
	const eventIdOffset = b.createString(eventId)
	const timestamp = Long.fromNumber(Date.now())
	const timestampFbLong = flatbuffers.Long.create(timestamp.low, timestamp.high)
	const frameOffset = message.Frame.createFrameVector(b, input)

	message.Frame.startFrame(b)
	message.Frame.addFrameSize(b, defaultConfig.codec.frameDuration)
	message.Frame.addSampleRate(b, defaultConfig.codec.sampleRate)
	message.Frame.addChannels(b, defaultConfig.codec.channels)
	message.Frame.addFrame(b, frameOffset)
	const streamFrameOffset = message.Frame.endFrame(b)

	message.StreamMessage.startStreamMessage(b)
	message.StreamMessage.addEventId(b, eventIdOffset)
	message.StreamMessage.addStreamId(b, streamIdOffset)
	message.StreamMessage.addMessageType(b, message.Message.Frame)
	message.StreamMessage.addMessage(b, streamFrameOffset)
	message.StreamMessage.addTimestamp(b,timestampFbLong)
	const streamMessageOffset = message.StreamMessage.endStreamMessage(b)

	b.finish(streamMessageOffset)
	return b.asUint8Array();
}

export const getStopMessage = (streamId, eventId) => {
	const b = new flatbuffers.Builder(1024)

	const streamIdOffset = b.createString(streamId)
	const eventIdOffset = b.createString(eventId)
	const timestamp = Long.fromNumber(Date.now())
	const timestampFbLong = flatbuffers.Long.create(timestamp.low, timestamp.high)

	message.Stop.startStop(b)
	const stopCastOffset = message.Stop.endStop(b)

	message.StreamMessage.startStreamMessage(b)
	message.StreamMessage.addEventId(b, eventIdOffset)
	message.StreamMessage.addStreamId(b, streamIdOffset)
	message.StreamMessage.addMessageType(b, message.Message.Stop)
	message.StreamMessage.addMessage(b, stopCastOffset)
	message.StreamMessage.addTimestamp(b, timestampFbLong)
	const streamMessageOffset = message.StreamMessage.endStreamMessage(b)

	b.finish(streamMessageOffset)
	return b.asUint8Array();
}

export const getSubscribeMessage = (streamId, eventId) => {
	const b = new flatbuffers.Builder(1024)

	const streamIdOffset = b.createString(streamId)
	const eventIdOffset = b.createString(eventId)
	const timestamp = Long.fromNumber(Date.now())
	const timestampFbLong = flatbuffers.Long.create(timestamp.low, timestamp.high)

	message.Subscribe.startSubscribe(b)
	const subscribeCastOffset = message.Subscribe.endSubscribe(b)

	message.StreamMessage.startStreamMessage(b)
	message.StreamMessage.addEventId(b, eventIdOffset)
	message.StreamMessage.addStreamId(b, streamIdOffset)
	message.StreamMessage.addMessageType(b, message.Message.Subscribe)
	message.StreamMessage.addMessage(b, subscribeCastOffset)
	message.StreamMessage.addTimestamp(b, timestampFbLong)
	const streamMessageOffset = message.StreamMessage.endStreamMessage(b)

	b.finish(streamMessageOffset)
	return b.asUint8Array();
}

export const getCommentMessage = (streamId, eventId, username, comment) => {
	const b = new flatbuffers.Builder(1024)

	const timestamp = Long.fromNumber(Date.now())
	const timestampFbLong = flatbuffers.Long.create(timestamp.low, timestamp.high)
	const streamIdOffset = b.createString(streamId)
	const eventIdOffset = b.createString(eventId)
	const userNameOffset = b.createString(username)
	const commentOffset = b.createString(comment)

	message.Comment.startComment(b)
	message.Comment.addUserName(b,userNameOffset)
	message.Comment.addText(b,commentOffset)
	const streamCommentOffset = message.Comment.endComment(b)

	message.StreamMessage.startStreamMessage(b)
	message.StreamMessage.addEventId(b, eventIdOffset)
	message.StreamMessage.addStreamId(b, streamIdOffset)
	message.StreamMessage.addMessageType(b, message.Message.Comment)
	message.StreamMessage.addMessage(b, streamCommentOffset)
	message.StreamMessage.addTimestamp(b,timestampFbLong)
	const streamMessageOffset = message.StreamMessage.endStreamMessage(b)

	b.finish(streamMessageOffset)
	return b.asUint8Array();
}

export const getStreamPauseMessage = (input, streamId, eventId) => {

}

export const getUnsubscribeMessage = (streamId, eventId) => {
	const b = new flatbuffers.Builder(1024)

	const streamIdOffset = b.createString(streamId)
	const eventIdOffset = b.createString(eventId)
	const timestamp = Long.fromNumber(Date.now())
	const timestampFbLong = flatbuffers.Long.create(timestamp.low, timestamp.high)

	message.UnSubscribe.startUnSubscribe(b)
	const unSubscribeCastOffset = message.UnSubscribe.endUnSubscribe(b)

	message.StreamMessage.startStreamMessage(b)
	message.StreamMessage.addEventId(b, eventIdOffset)
	message.StreamMessage.addStreamId(b, streamIdOffset)
	message.StreamMessage.addMessageType(b, message.Message.UnSubscribe)
	message.StreamMessage.addMessage(b, unSubscribeCastOffset)
	message.StreamMessage.addTimestamp(b, timestampFbLong)
	const streamMessageOffset = message.StreamMessage.endStreamMessage(b)

	b.finish(streamMessageOffset)
	return b.asUint8Array();
}
