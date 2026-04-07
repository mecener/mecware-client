import type { FC } from "react";
import AuthModal from "./AuthModal";
import LoaderModal from "./LoaderModal";
import NewScenario from "./Scenario/NewScenario";

const Modals: FC = () => {
	return (
		<>
			<AuthModal />
			<LoaderModal />
			<NewScenario />
		</>
	);
};

export default Modals;
