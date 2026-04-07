import authSlice from "./slices/auth";
import exampleSlice from "./slices/example";
import globalSlice from "./slices/global";
import modalSlice from "./slices/modal";
import scenarioSlice from "./slices/scenario";
import usersSlice from "./slices/users";

export default {
	...exampleSlice.actions,
	...modalSlice.actions,
	...globalSlice.actions,
	...authSlice.actions,
	...scenarioSlice.actions,
	...usersSlice.actions,
};
