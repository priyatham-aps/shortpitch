import ControlSocket from "../api/controlSocket";

export const sendComment = (sId, eId, username, comment) => {
	ControlSocket.sendComment(sId, eId, username, comment);
}
