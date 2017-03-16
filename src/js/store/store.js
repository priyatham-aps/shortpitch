import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk"
import reducer from "./reducer";
import { parsePath } from "./utils";

const initState = (() => {
	const path = parsePath(window.location.pathname);

	return {
		currentPath: path
	}
})();

const store = createStore(reducer, initState, applyMiddleware(thunkMiddleware));

export default store
