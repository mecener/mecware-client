import { useAppSelector } from "@/hooks/useAppSelector";
import { useEffect, type FC } from "react";
import { Outlet, useNavigate } from "react-router";

const GuardLayout: FC = () => {
	const { authenticated } = useAppSelector((state) => state.auth);

	const navigate = useNavigate();

	useEffect(() => {
		if (authenticated !== null && authenticated === false) {
			navigate("/signin");
		}
	}, [authenticated]);

	return <Outlet />;
};

export default GuardLayout;
