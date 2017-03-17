// automatically generated by the FlatBuffers compiler, do not modify

/**
 * @const
 * @namespace
 */
var message = message || {};

/**
 * @enum
 */
message.InputEncoding = {
  Opus: 1,
  PCM: 2,
  AAC: 3
};

/**
 * @enum
 */
message.ResponseStatus = {
  OK: 1,
  NoStream: 2,
  NotAllowed: 3,
  Error: 4
};

/**
 * @enum
 */
message.StreamStatus = {
  CREATED: 0,
  STREAMING: 1,
  STOPPED: 2,
  ERROR: 3
};

/**
 * @enum
 */
message.Message = {
  NONE: 0,
  BroadCast: 1,
  Pause: 2,
  Stop: 3,
  Frame: 4,
  Comment: 5,
  Subscribe: 6,
  Response: 7,
  Status: 8,
  UnSubscribe: 9
};

/**
 * @constructor
 */
message.Subscribe = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {message.Subscribe}
 */
message.Subscribe.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {message.Subscribe=} obj
 * @returns {message.Subscribe}
 */
message.Subscribe.getRootAsSubscribe = function(bb, obj) {
  return (obj || new message.Subscribe).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param {flatbuffers.Builder} builder
 */
message.Subscribe.startSubscribe = function(builder) {
  builder.startObject(0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
message.Subscribe.endSubscribe = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
message.UnSubscribe = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {message.UnSubscribe}
 */
message.UnSubscribe.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {message.UnSubscribe=} obj
 * @returns {message.UnSubscribe}
 */
message.UnSubscribe.getRootAsUnSubscribe = function(bb, obj) {
  return (obj || new message.UnSubscribe).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param {flatbuffers.Builder} builder
 */
message.UnSubscribe.startUnSubscribe = function(builder) {
  builder.startObject(0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
message.UnSubscribe.endUnSubscribe = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
message.Status = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {message.Status}
 */
message.Status.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {message.Status=} obj
 * @returns {message.Status}
 */
message.Status.getRootAsStatus = function(bb, obj) {
  return (obj || new message.Status).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {message.StreamStatus}
 */
message.Status.prototype.status = function() {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? /** @type {message.StreamStatus} */ (this.bb.readInt8(this.bb_pos + offset)) : message.StreamStatus.CREATED;
};

/**
 * @returns {number}
 */
message.Status.prototype.subscribeCount = function() {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
};

/**
 * @param {flatbuffers.Builder} builder
 */
message.Status.startStatus = function(builder) {
  builder.startObject(2);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {message.StreamStatus} status
 */
message.Status.addStatus = function(builder, status) {
  builder.addFieldInt8(0, status, message.StreamStatus.CREATED);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} subscribeCount
 */
message.Status.addSubscribeCount = function(builder, subscribeCount) {
  builder.addFieldInt32(1, subscribeCount, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
message.Status.endStatus = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
message.BroadCast = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {message.BroadCast}
 */
message.BroadCast.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {message.BroadCast=} obj
 * @returns {message.BroadCast}
 */
message.BroadCast.getRootAsBroadCast = function(bb, obj) {
  return (obj || new message.BroadCast).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {message.InputEncoding}
 */
message.BroadCast.prototype.encoding = function() {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? /** @type {message.InputEncoding} */ (this.bb.readInt8(this.bb_pos + offset)) : message.InputEncoding.Opus;
};

/**
 * @param {flatbuffers.Builder} builder
 */
message.BroadCast.startBroadCast = function(builder) {
  builder.startObject(1);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {message.InputEncoding} encoding
 */
message.BroadCast.addEncoding = function(builder, encoding) {
  builder.addFieldInt8(0, encoding, message.InputEncoding.Opus);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
message.BroadCast.endBroadCast = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
message.Pause = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {message.Pause}
 */
message.Pause.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {message.Pause=} obj
 * @returns {message.Pause}
 */
message.Pause.getRootAsPause = function(bb, obj) {
  return (obj || new message.Pause).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param {flatbuffers.Builder} builder
 */
message.Pause.startPause = function(builder) {
  builder.startObject(0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
message.Pause.endPause = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
message.Stop = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {message.Stop}
 */
message.Stop.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {message.Stop=} obj
 * @returns {message.Stop}
 */
message.Stop.getRootAsStop = function(bb, obj) {
  return (obj || new message.Stop).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param {flatbuffers.Builder} builder
 */
message.Stop.startStop = function(builder) {
  builder.startObject(0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
message.Stop.endStop = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
message.Frame = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {message.Frame}
 */
message.Frame.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {message.Frame=} obj
 * @returns {message.Frame}
 */
message.Frame.getRootAsFrame = function(bb, obj) {
  return (obj || new message.Frame).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {number}
 */
message.Frame.prototype.frameSize = function() {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.readUint8(this.bb_pos + offset) : 0;
};

/**
 * @returns {number}
 */
message.Frame.prototype.sampleRate = function() {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
};

/**
 * @returns {number}
 */
message.Frame.prototype.channels = function() {
  var offset = this.bb.__offset(this.bb_pos, 8);
  return offset ? this.bb.readUint8(this.bb_pos + offset) : 0;
};

/**
 * @param {number} index
 * @returns {number}
 */
message.Frame.prototype.frame = function(index) {
  var offset = this.bb.__offset(this.bb_pos, 10);
  return offset ? this.bb.readUint8(this.bb.__vector(this.bb_pos + offset) + index) : 0;
};

/**
 * @returns {number}
 */
message.Frame.prototype.frameLength = function() {
  var offset = this.bb.__offset(this.bb_pos, 10);
  return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @returns {Uint8Array}
 */
message.Frame.prototype.frameArray = function() {
  var offset = this.bb.__offset(this.bb_pos, 10);
  return offset ? new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
};

/**
 * @param {flatbuffers.Builder} builder
 */
message.Frame.startFrame = function(builder) {
  builder.startObject(4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} frameSize
 */
message.Frame.addFrameSize = function(builder, frameSize) {
  builder.addFieldInt8(0, frameSize, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} sampleRate
 */
message.Frame.addSampleRate = function(builder, sampleRate) {
  builder.addFieldInt32(1, sampleRate, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} channels
 */
message.Frame.addChannels = function(builder, channels) {
  builder.addFieldInt8(2, channels, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} frameOffset
 */
message.Frame.addFrame = function(builder, frameOffset) {
  builder.addFieldOffset(3, frameOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<number>} data
 * @returns {flatbuffers.Offset}
 */
message.Frame.createFrameVector = function(builder, data) {
  builder.startVector(1, data.length, 1);
  for (var i = data.length - 1; i >= 0; i--) {
    builder.addInt8(data[i]);
  }
  return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
message.Frame.startFrameVector = function(builder, numElems) {
  builder.startVector(1, numElems, 1);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
message.Frame.endFrame = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
message.Comment = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {message.Comment}
 */
message.Comment.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {message.Comment=} obj
 * @returns {message.Comment}
 */
message.Comment.getRootAsComment = function(bb, obj) {
  return (obj || new message.Comment).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array}
 */
message.Comment.prototype.userName = function(optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array}
 */
message.Comment.prototype.text = function(optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param {flatbuffers.Builder} builder
 */
message.Comment.startComment = function(builder) {
  builder.startObject(2);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} userNameOffset
 */
message.Comment.addUserName = function(builder, userNameOffset) {
  builder.addFieldOffset(0, userNameOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} textOffset
 */
message.Comment.addText = function(builder, textOffset) {
  builder.addFieldOffset(1, textOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
message.Comment.endComment = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
message.Response = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {message.Response}
 */
message.Response.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {message.Response=} obj
 * @returns {message.Response}
 */
message.Response.getRootAsResponse = function(bb, obj) {
  return (obj || new message.Response).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {message.ResponseStatus}
 */
message.Response.prototype.status = function() {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? /** @type {message.ResponseStatus} */ (this.bb.readInt8(this.bb_pos + offset)) : message.ResponseStatus.OK;
};

/**
 * @param {flatbuffers.Builder} builder
 */
message.Response.startResponse = function(builder) {
  builder.startObject(1);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {message.ResponseStatus} status
 */
message.Response.addStatus = function(builder, status) {
  builder.addFieldInt8(0, status, message.ResponseStatus.OK);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
message.Response.endResponse = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
message.StreamMessage = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {message.StreamMessage}
 */
message.StreamMessage.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {message.StreamMessage=} obj
 * @returns {message.StreamMessage}
 */
message.StreamMessage.getRootAsStreamMessage = function(bb, obj) {
  return (obj || new message.StreamMessage).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array}
 */
message.StreamMessage.prototype.eventId = function(optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array}
 */
message.StreamMessage.prototype.streamId = function(optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @returns {message.Message}
 */
message.StreamMessage.prototype.messageType = function() {
  var offset = this.bb.__offset(this.bb_pos, 8);
  return offset ? /** @type {message.Message} */ (this.bb.readUint8(this.bb_pos + offset)) : message.Message.NONE;
};

/**
 * @param {flatbuffers.Table} obj
 * @returns {?flatbuffers.Table}
 */
message.StreamMessage.prototype.message = function(obj) {
  var offset = this.bb.__offset(this.bb_pos, 10);
  return offset ? this.bb.__union(obj, this.bb_pos + offset) : null;
};

/**
 * @returns {flatbuffers.Long}
 */
message.StreamMessage.prototype.timestamp = function() {
  var offset = this.bb.__offset(this.bb_pos, 12);
  return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 */
message.StreamMessage.startStreamMessage = function(builder) {
  builder.startObject(5);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} eventIdOffset
 */
message.StreamMessage.addEventId = function(builder, eventIdOffset) {
  builder.addFieldOffset(0, eventIdOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} streamIdOffset
 */
message.StreamMessage.addStreamId = function(builder, streamIdOffset) {
  builder.addFieldOffset(1, streamIdOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {message.Message} messageType
 */
message.StreamMessage.addMessageType = function(builder, messageType) {
  builder.addFieldInt8(2, messageType, message.Message.NONE);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} messageOffset
 */
message.StreamMessage.addMessage = function(builder, messageOffset) {
  builder.addFieldOffset(3, messageOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Long} timestamp
 */
message.StreamMessage.addTimestamp = function(builder, timestamp) {
  builder.addFieldInt64(4, timestamp, builder.createLong(0, 0));
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
message.StreamMessage.endStreamMessage = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} offset
 */
message.StreamMessage.finishStreamMessageBuffer = function(builder, offset) {
  builder.finish(offset);
};

// Exports for Node.js and RequireJS
this.message = message;
