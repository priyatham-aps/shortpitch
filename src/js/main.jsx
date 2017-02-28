import React from "react";
import ReactDOM from 'react-dom'
import App from './components/app';
import store from './store/store'

const render = () => ReactDOM.render(
	<App data={store.getState()}/>,
	document.getElementById("main")
);

render()
store.subscribe(render)
