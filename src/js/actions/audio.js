import Streamer from "../audio/streamer";
import Player from "../audio/player";
import ControlSocket from "../api/controlSocket";
import * as actiontypes from "./types";
import { defaultConfig } from "../globals";

export const startStreaming = (sId, eId) => {
	// ControlSocket.sendStreamBroadcastMsg(sId, eId);
	Streamer.start(sId, eId);
}

export const stopStreaming = (sId, eId) => {
	Streamer.stop(sId, eId);
}

export const startPlaying = (sId) => {
	Player.start(sId);
}

export const stopPlaying = (sId) => {
	Player.stop(sId);
}
