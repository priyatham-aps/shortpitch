export const parsePath = (path) => {
	const splitPath = path.split("/");
	return {
		key: splitPath[1] ? splitPath[1] : "",
		param: splitPath[2] ? splitPath[2] : ""
	}
}
