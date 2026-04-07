import type { FC } from "react";
import { motion as m } from "framer-motion";
import { Outlet } from "react-router-dom";
import Block from "@/components/Primitives/Block";

const MainLayout: FC = () => {
	const transitions = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	};

	return (
		<Block $minHeight="100%" $width="100%">
			<m.div style={{ display: "flex", width: "100%" }} {...transitions}>
				<Outlet />
			</m.div>
		</Block>
	);
};

export default MainLayout;
