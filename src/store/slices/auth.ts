import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface authState {
	authenticated: boolean | null;
	id: number | null;
	accessToken: string | null;
}

const initialState: authState = {
	authenticated: null,
	id: null,
	accessToken: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logIn(state, action: PayloadAction<{ token: string | null; id: number | null }>) {
			state.authenticated = true;
			state.accessToken = action.payload.token;
			state.id = action.payload.id;
		},
		logOut(state) {
			state.authenticated = false;
			state.accessToken = null;
		},
	},
});

export default authSlice;
