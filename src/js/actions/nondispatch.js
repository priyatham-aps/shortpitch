export const updatePath = (path) => {
	window.history.pushState(null, null, path);
	window.dispatchEvent(new window.PopStateEvent("popstate"));
}
