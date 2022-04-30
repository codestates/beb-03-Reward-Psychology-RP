import { createSlice } from '@reduxjs/toolkit';

const globalStateSlice = createSlice({
    name: 'globalState',
    initialState: {
        isLoggedIn: false,
        userData: {},
    },
    reducers: {
        login: (state) => {
            state = true;
        },
        dataReceive: (state, action) => {
            state = { ...state, action };
        },
    },
});

export const { login, dataReceive } = globalStateSlice.actions;
export default globalStateSlice.reducer;
