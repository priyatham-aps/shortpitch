import Streamer from "../audio/streamer";
import ControlSocket from "../api/controlSocket";
import * as actiontypes from "./types";
import { defaultConfig } from "../globals";

export const startStreaming = (sId, eId) => {
	// ControlSocket.sendStreamBroadcastMsg(sId, eId);
	Streamer.start(sId, eId);
}

export const stopStreaming = () => {
	Streamer.stop();
}
