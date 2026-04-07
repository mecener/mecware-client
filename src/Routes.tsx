import { Navigate } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import ProjectManager from "./pages/ProjectManager/ProjectManager";
import KeyboardTracker from "./pages/KeyboardTracker/KeyboardTracker";
import ActivityTracker from "./pages/ActivityTracker/ActivityTracker";
import ViewDatabase from "./pages/ViewDatabase/ViewDatabase";
import DiscordRPC from "./pages/DiscordRPC/DiscordRPC";
import { Icon } from "./components/Primitives/Icon";
import Scenarios from "./pages/Scenario/Scenarios";
import Scenario from "./pages/Scenario/Scenario";

type AppRouteNames =
	| "Redirection"
	| "Signin"
	| "Signup"
	| "Scenarios"
	| "Scenario"
	| "Project manager"
	| "Keyboard Tracker"
	| "Activity Tracker"
	| "Discord RPC"
	| "View Database";

export interface AppRoute {
	path: string;
	element: React.ReactElement;
	name: AppRouteNames;
	group?: string;
	isIndex?: boolean;
	isNavbarRender?: boolean;
	renderOnSidebar?: boolean;
	active?: boolean;
	icon?: React.ReactNode;
}

export const AppRoutes: Record<string, AppRoute> = {
	INDEX: {
		path: "/",
		name: "Redirection",
		element: <Navigate to="/scenario" replace />,
		isIndex: true,
	},
	SIGN_IN: {
		path: "/signin",
		name: "Signin",
		group: "auth",
		element: <SignIn />,
	},
	SIGN_UP: {
		path: "/signup",
		name: "Signup",
		group: "auth",
		element: <SignUp />,
	},
	SCENARIOS: {
		path: "/scenarios",
		name: "Scenarios",
		group: "app",
		element: <Scenarios />,
		renderOnSidebar: true,
		icon: <Icon.Scenario />,
	},
	SCENARIO: {
		path: "/scenarios/:id",
		name: "Scenario",
		group: "app",
		element: <Scenario />,
	},
	PROJECT_MANAGER: {
		path: "/project-manager",
		name: "Project manager",
		group: "app",
		element: <ProjectManager />,
		renderOnSidebar: true,
		active: false,
		icon: <Icon.App />,
	},
	KEYBOARD_TRACKER: {
		path: "/keyboard-tracker",
		name: "Keyboard Tracker",
		group: "app",
		element: <KeyboardTracker />,
		renderOnSidebar: true,
		active: false,
		icon: <Icon.KeyboardTracker />,
	},
	ACTIVITY_TRACKER: {
		path: "/activity-tracker",
		name: "Activity Tracker",
		group: "app",
		element: <ActivityTracker />,
		renderOnSidebar: true,
		active: false,
		icon: <Icon.Activity />,
	},
	VIEW_DATABASE: {
		path: "/view-database",
		name: "View Database",
		group: "app",
		element: <ViewDatabase />,
		renderOnSidebar: true,
		active: false,
		icon: <Icon.ViewDatabase />,
	},
	DISCORD_RPC: {
		path: "/discord-rpc",
		name: "Discord RPC",
		group: "app",
		element: <DiscordRPC />,
		renderOnSidebar: true,
		active: false,
		icon: <Icon.Discord />,
	},
};
