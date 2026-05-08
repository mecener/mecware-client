import { useEffect, type FC } from "react";
import AppRouter from "./AppRouter";
import Modals from "./components/Modal/Modals";
import { useGetMeQuery, useLazyGetAllUsersQuery, useLazyGetScenarioQuery } from "./services/api";
import { useActions } from "./hooks/useActions";
import { useAppSelector } from "./hooks/useAppSelector";
import { useNavigate } from "react-router-dom";

/*
	<Continue.Here4/>
	= u legend, bruh! u finally complete this auth pages, I'm shocked!
	= in the sequel we need to start utils, I think should be
	= on the first make sidebar, still be so cool, bruh, good luck u!
	= 27.03.2026 23:43
*/

const App: FC = () => {
	const { data, isError, isLoading } = useGetMeQuery();

	const { logIn, logOut, setModalVisibility } = useActions();

	const { authenticated } = useAppSelector((state) => state.auth);

	const [triggerGetScenarios] = useLazyGetScenarioQuery();
	const [triggerGetUsers] = useLazyGetAllUsersQuery();

	useEffect(() => {
		if (authenticated) {
			triggerGetScenarios()
				.unwrap()
				.then((response) => console.log(response));

			triggerGetUsers()
				.unwrap()
				.then((response) => console.log(response));
		}
	}, [authenticated]);

	const emailVerificationCheck = (isActivated: boolean) => {
		if (!isActivated) {
			setModalVisibility({ name: "emailVerification", isVisible: true });
		}
	};

	const navigate = useNavigate();

	useEffect(() => {
		if (data) {
			logIn({ token: data.accessToken, id: data.user.id });
			emailVerificationCheck(data.user.isActivated);
		}

		if (isLoading) {
			setModalVisibility({ name: "loader", isVisible: true });
		} else {
			setModalVisibility({ name: "loader", isVisible: false });
		}

		if (isError) {
			logOut();
			navigate("/signin");
		}
	}, [data, isError, isLoading]);

	return (
		<>
			<AppRouter />
			<Modals />
		</>
	);
};

export default App;
