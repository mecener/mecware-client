import type { ScenarioAttributes } from "@/services/api.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface scenarioState {
	scenarios: {
		my: ScenarioAttributes[];
		shared: ScenarioAttributes[];
	};
}

const initialState: scenarioState = {
	scenarios: {
		my: [],
		shared: [],
	},
};

const scenarioSlice = createSlice({
	name: "scenario",
	initialState,
	reducers: {
		setMyScenarios(state, action: PayloadAction<ScenarioAttributes[]>) {
			state.scenarios.my = action.payload;
		},
		setSharedScenarios(state, action: PayloadAction<ScenarioAttributes[]>) {
			state.scenarios.shared = action.payload;
		},
	},
});

export default scenarioSlice;
