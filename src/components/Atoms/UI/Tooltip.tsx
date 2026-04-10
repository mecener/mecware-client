import type { FC } from "react";
import styled, { css } from "styled-components";
import { motion as m } from "framer-motion";
import { palette } from "@/style/colorPalette";
import { Body } from "@/components/Primitives/Typography";
import { Icon } from "@/components/Primitives/Icon";
import type React from "react";

interface TooltipProps {
	$side?: "top" | "right" | "bottom" | "left";
	$contentPlacement?: "start" | "center" | "end";
	$maxWidth?: string;
	$style?: "error" | "default";
	ref?: React.RefObject<HTMLDivElement | null>;
	onClick?: (event: MouseEvent) => void;
	children: React.ReactNode;
}

const tooltipTransitions = {
	initial: { opacity: 0, x: 10 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: 10, transition: { delay: 0.15 } },
};

const arrowTransitions = {
	initial: { opacity: 0, x: 5 },
	animate: { opacity: 1, x: 0, transition: { delay: 0.15 } },
	exit: { opacity: 0, x: 5 },
};

const StyledTooltip = styled(m.div)<Pick<TooltipProps, "$side" | "$contentPlacement" | "$maxWidth" | "$style" | "onClick">>`
	position: absolute;
	z-index: 1;
	${({ $side, $contentPlacement }) =>
		$side &&
		$contentPlacement &&
		css`
			${{
				top: "bottom",
				right: "left",
				bottom: "top",
				left: "right",
			}[$side]}: calc(100% + 12px);
			${{
				start: () => (["top", "bottom"].includes($side) ? "left" : "top"),
				center: () => (["top", "bottom"].includes($side) ? "left" : "top"),
				end: () => (["top", "bottom"].includes($side) ? "right" : "bottom"),
			}[$contentPlacement]}: ${["start", "end"].includes($contentPlacement) ? "-4px" : "50%"};
			${$contentPlacement === "center" &&
			css`
				translate: ${["top", "bottom"].includes($side) ? "-50% 0" : "0 -50%"};
			`}
		`}
	padding: 16px 20px;
	border-radius: 8px;
	background-color: ${({ $style }) => ($style === "error" ? "#211414" : palette.black[700])};
	max-width: ${({ $maxWidth }) => $maxWidth || "100%"};
	width: max-content;
`;

const getArrowRotate = (side: TooltipProps["$side"]): string => {
	switch (side) {
		case "top":
			return "-90deg";
		case "bottom":
			return "90deg";
		case "left":
			return "180deg";
		default:
			return "0deg";
	}
};

/*
	<Continue.Here3/>
	= ure on the right path, bruh!
	= in the end, we just need to link up the pointer
	= with our positioning moment and all be gotta good.
	= yeah, true, there's still one more thing...
	= gotta figure something out with the tooltip sizes,
	= but you're a legend, I know u will come up with something!
	= Love u, man. Catch tomorrow! 26.03.2026 23:32, bye
*/

const ArrowContainer = styled(m.div)<Pick<TooltipProps, "$side" | "$contentPlacement" | "$style" | "onClick">>`
	position: absolute;
	z-index: 0;
	color: ${({ $style }) => ($style === "error" ? "#211414" : palette.black[600])};

	${({ $side, $contentPlacement }) =>
		$side &&
		$contentPlacement &&
		css`
			${{
				top: "bottom",
				right: "left",
				bottom: "top",
				left: "right",
			}[$side]}: calc(100% + ${["top", "bottom"].includes($side) ? "2px" : "4px"});
			${{
				start: () => (["top", "bottom"].includes($side) ? "left" : "top"),
				center: () => (["top", "bottom"].includes($side) ? "left" : "top"),
				end: () => (["top", "bottom"].includes($side) ? "right" : "bottom"),
			}[$contentPlacement]}: ${["start", "end"].includes($contentPlacement) ? "8px" : "50%"};
			${$contentPlacement === "center" &&
			css`
				translate: ${["top", "bottom"].includes($side) ? "-50% 0" : "0 -50%"};
			`}
			rotate: ${getArrowRotate($side)};
		`}

	&,
	svg {
		height: 14px;
		width: 9px;
	}

	svg {
		translate: 0 -7px;
	}
`;

const Tooltip: FC<TooltipProps> = ({ children, $style = "error", ...props }) => {
	return (
		<>
			<StyledTooltip $style={$style} {...props} {...tooltipTransitions}>
				<Body.XS $color={palette.error[500]}>{children}</Body.XS>
			</StyledTooltip>
			<ArrowContainer $style={$style} {...props} {...arrowTransitions}>
				<Icon.TooltipArrow />
			</ArrowContainer>
		</>
	);
};

export default Tooltip;

/*
	<Continue.Here2/>
	= ohh, bruh, I will think that fucking ToOlTiP component will be easy,
	= but that's asshole will be so LARGE, HUGE AND MASSIVE, I want to kill him right now.
	= We need make thing with him fucking PoSiTiOnInG, and him content,
	= I think what that process will be BORED and no interesting,
	= but I believe in you <3 25.03.2026 23:43
	= P.S.: oh, yeah, don't listen AI, he lies, because stupid :D
*/
