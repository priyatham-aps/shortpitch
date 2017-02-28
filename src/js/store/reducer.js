export default (state = "", action) => {
	switch(action.type) {
		case "SET":
			return action.id
		case "REMOVE":
			return ""
		default:
			return state
	}
}
