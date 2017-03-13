import Streamer from "../audio/streamer";
import Player from "../audio/player";
import ControlSocket from "../api/controlSocket";

export const startStreaming = (sId, eId) => {
	Streamer.start(sId, eId);
}

export const stopStreaming = (sId, eId) => {
	Streamer.stop(sId, eId);
}

export const startPlaying = (sId, eId) => {
	Player.start(sId, eId);
}

export const stopPlaying = (sId, eId) => {
	Player.stop(sId, eId);
}
