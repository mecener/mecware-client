import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
	id: number;
	username: string;
	email: string;
	isActivated: boolean;
	avatar: string | null;
}

interface usersState {
	users: User[];
}

const initialState: usersState = {
	users: [],
};

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setUsers(state, action: PayloadAction<User[]>) {
			state.users = action.payload;
		},
	},
});

export default usersSlice;
