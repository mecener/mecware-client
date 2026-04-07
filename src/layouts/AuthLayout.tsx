import Block from "@/components/Primitives/Block";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useEffect, type FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout: FC = () => {
	const { authenticated } = useAppSelector((state) => state.auth);

	const navigate = useNavigate();

	useEffect(() => {
		if (authenticated !== null && authenticated === true) {
			navigate("/scenarios");
		}
	}, [authenticated]);

	return (
		<Block $justifyContent="center" $width="100%" $alignItems="center">
			<Outlet />
		</Block>
	);
};

export default AuthLayout;
