import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import store from "./store/store";
import { setCurrentPath } from "./actions/actions";

const render = () => ReactDOM.render(
	<App data={store.getState()}/>,
	document.getElementById("main")
);

(function init() {
	window.addEventListener("popstate", (e) => {
		store.dispatch(setCurrentPath(window.location.pathname));
	})
})();

render();

store.subscribe(render);
