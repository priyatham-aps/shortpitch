//Globals - start
import "whatwg-fetch";
//Globals - end
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import store from "./store/store";
import { setCurrentPath } from "./actions/actions";
import ControlSocket from "./api/controlSocket";

const render = () => ReactDOM.render(
	<App data={store.getState()}/>,
	document.getElementById("main")
);

(function init() {
	window.addEventListener("popstate", (e) => {
		store.dispatch(setCurrentPath(window.location.pathname));
	})

	window.onbeforeunload = function() {
		console.log("onbeforeunload");
		ControlSocket._closeSocket();
	};
})();

render();

store.subscribe(render);
