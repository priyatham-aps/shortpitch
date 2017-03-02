export default class OpusDecoder {
    constructor(sampling_rate, channels) {
        this.handle = 0;
        this.in_ptr = 0;
        this.out_ptr = 0;
        this.channels = channels;
        var err_ptr = allocate(4, 'i32', ALLOC_STACK);
        this.handle = _opus_decoder_create(sampling_rate, channels, err_ptr);
        if (getValue(err_ptr, 'i32') != 0 /* OK */)
            throw 'opus_decoder_create failed: ' + getValue(err_ptr, 'i32');
        this.in_ptr = _malloc(Opus.getMaxFrameSize(channels));
        this.in_buf = HEAPU8.subarray(this.in_ptr, this.in_ptr + Opus.getMaxFrameSize(channels));
        this.out_len = Opus.getMaxSamplesPerChannel(sampling_rate);
        var out_bytes = this.out_len * channels * 4;
        this.out_ptr = _malloc(out_bytes);
        this.out_i16 = HEAP16.subarray(this.out_ptr >> 1, (this.out_ptr + out_bytes) >> 1);
        this.out_f32 = HEAPF32.subarray(this.out_ptr >> 2, (this.out_ptr + out_bytes) >> 2);
    }
    
    decode(packet) {
        this.in_buf.set(new Uint8Array(packet));
        var ret = _opus_decode(this.handle, this.in_ptr, packet.byteLength, this.out_ptr, this.out_len, 0);
        if (ret < 0)
            throw 'opus_decode failed: ' + ret;
        var samples = new Int16Array(ret * this.channels);
        samples.set(this.out_i16.subarray(0, samples.length));
        return samples;
    };
    decode_float(packet) {
        this.in_buf.set(new Uint8Array(packet));
        var ret = _opus_decode_float(this.handle, this.in_ptr, packet.byteLength, this.out_ptr, this.out_len, 0);
        if (ret < 0)
            throw 'opus_decode failed: ' + ret;
        var samples = new Float32Array(ret * this.channels);
        samples.set(this.out_f32.subarray(0, samples.length));
        return samples;
    };
    destroy() {
        if (!this.handle)
            return;
        _opus_decoder_destroy(this.handle);
        _free(this.in_ptr);
        _free(this.out_ptr);
        this.handle = this.in_ptr = this.out_ptr = 0;
    };
}