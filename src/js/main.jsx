import React from "react";
import ReactDOM from 'react-dom'
import App from './components/app';
import store from './store/store'
import * as Message from "./fbs/stream"

console.log(Message);

const render = () => ReactDOM.render(
	<App data={store.getState()}/>,
	document.getElementById("main")
);

render()

store.subscribe(render)
