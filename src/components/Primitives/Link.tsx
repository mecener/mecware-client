import type { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Label } from "./Typography";

interface LinkProps {
	to: string;
	size?: "S" | "M" | "L";
	children: React.ReactNode;
}

const Link: FC<LinkProps> = ({ to, size = "M", children }) => {
	const LabelComponent = {
		S: Label.S,
		M: Label.M,
		L: Label.L,
	}[size];

	return (
		<RouterLink to={to}>
			<LabelComponent>{children}</LabelComponent>
		</RouterLink>
	);
};

export default Link;
