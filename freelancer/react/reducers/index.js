export function mainReducer(state={},action) {
    switch(action.type) {
        case "CHECK_INFO":
        console.log("store changed");
        return Object.assign({}, state, {username: action.username, password: action.password, uname: action.uname});
        //return state;
        break;

        default:
        return state;
        break;
    }
}