import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: localStorage.getItem('isAuth') === 'true',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
            localStorage.setItem('isAuth', 'true');
        },
        logout: (state) => {
            state.isAuthenticated = false;
            localStorage.removeItem('isAuth');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
