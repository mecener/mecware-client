import type { FC } from "react";

import LoaderIcon from "@assets/loader.svg?react";
import styled from "styled-components";
import Block from "./Block";
import { palette } from "@/style/colorPalette";

interface LoaderProps {
	$overlay?: string;
	$color?: string;
	$baseColor?: string;
}

const LoaderWrapper = styled(Block)<LoaderProps>`
	${({ $overlay }) =>
		$overlay
			? `
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: ${$overlay};
	`
			: `
			position: relative;
			width: 20px;
			height: 20px;
	`}
`;

const LoaderBase = styled.div<LoaderProps>`
	width: 16px;
	height: 16px;
	border: 4px solid ${({ $baseColor }) => $baseColor || palette.black[200]};
	border-radius: 8px;
	color: ${({ $color }) => $color || "black"};

	svg {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		animation: rotate 1s linear infinite;

		path {
			stroke: currentColor;
		}
	}

	@keyframes rotate {
		to {
			rotate: 360deg;
		}
	}
`;

const Loader: FC<LoaderProps> = (props) => {
	return (
		<LoaderWrapper {...props} $justifyContent="center" $alignItems="center">
			<LoaderBase {...props}>
				<LoaderIcon />
			</LoaderBase>
		</LoaderWrapper>
	);
};

export default Loader;
