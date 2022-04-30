const reducer = (currState, action) => {
    if (currState === undefined) {
        return { isLoggedIn: false, userData: '' };
    }
    let newState = { ...currState };
    if (action.type === 'LOGIN') {
        newState.isLoggedIn = true;
    } else if (action.type === 'LOGOUT') {
        newState.isLoggedIn = false;
    }
    console.log(currState === newState);
    return newState;
};

export default reducer;
