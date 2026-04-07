import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface globalState {
	lang: "ru" | "en" | null;
}

const initialState: globalState = {
	lang: null,
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setLanguage(state, action: PayloadAction<"ru" | "en" | null>) {
			state.lang = action.payload;
			localStorage.setItem("language", JSON.stringify(action.payload));
		},
	},
});

export default globalSlice;
