import styled, { css } from "styled-components";
import Block from "../../Primitives/Block";
import { Label } from "../../Primitives/Typography";
import { palette } from "@/style/colorPalette";
import { AnimatePresence as AP, motion as m } from "framer-motion";
import Loader from "../../Primitives/Loader";
import type React from "react";

interface ButtonProps {
	$fill?: boolean;
	$icon?: React.ReactNode;
	$iconPlacement?: "right" | "left";
	$isLoading?: boolean;
	onClick?: (event: React.MouseEvent) => void;
	disabled?: boolean;
	children?: React.ReactNode;
}

const ButtonBase = styled(Block).attrs({ as: "button" })<ButtonProps>`
	${({ $fill }) => ($fill ? "flex: 1 1 auto" : "")};
	position: relative;
	height: 44px;

	overflow: hidden;
	user-select: none;

	transition: 100ms;

	> svg {
		width: 14px;
		height: 14px;
	}

	> ${Label.M} {
		color: currentColor;
		display: inline-block;
		margin: ${({ $icon, $iconPlacement }) => {
			return $icon ? ($iconPlacement === "right" ? "0 8px 0 0" : "0 0 0 8px") : "";
		}};
	}

	${({ $isLoading }) =>
		$isLoading
			? css`
					pointer-events: none;
				`
			: ""};

	&:disabled {
		pointer-events: none;
		scale: 0.9;
		opacity: 0.25;
	}

	&:active {
		translate: 0 2px;
	}
`;

interface ButtonVariantColor {
	default: {
		background: string;
		color: string;
		boxShadow: {
			inset: string;
			outset: string;
		};
	};
	hover: {
		background: string;
		color: string;
	};
	active: string;
	loader: {
		overlay: string;
		baseColor: string;
		color: string;
	};
}

const createButtonVariant = (colors: ButtonVariantColor) => {
	return styled(ButtonBase)`
		background-color: ${colors.default.background};
		color: ${colors.default.color};
		box-shadow:
			inset 0 1px 0 0 ${colors.default.boxShadow.inset},
			0 2px 0 0 ${colors.default.boxShadow.outset};

		@media (hover: hover) and (pointer: fine) {
			&:hover {
				background-color: ${colors.hover.background};
				color: ${colors.hover.color};
				box-shadow:
					inset 0 0px 0 0 ${colors.default.boxShadow.inset},
					0 2px 0 0 ${colors.default.boxShadow.outset};
			}
		}

		&:active {
			background-color: ${colors.active};
			box-shadow:
				inset 0 0px 0 0 ${colors.default.boxShadow.inset},
				0 0px 0 0 ${colors.default.boxShadow.outset};
		}

		&:disabled {
			box-shadow:
				inset 0 0px 0 0 ${colors.default.boxShadow.inset},
				0 0px 0 0 ${colors.default.boxShadow.outset};
		}

		${({ $isLoading }) =>
			$isLoading &&
			css`
				box-shadow:
					inset 0 0px 0 0 ${colors.default.boxShadow.inset},
					0 0px 0 0 ${colors.default.boxShadow.outset};
			`}
	`;
};

/*
	<Continue.Here5/>
	= there's good, don't forget complete button styles
	= 28.03.2026 06:02
*/

const variantsConfig = {
	Primary: {
		default: {
			background: palette.primary[500],
			color: palette.black[900],
			boxShadow: {
				inset: palette.primary[200],
				outset: palette.primary[900],
			},
		},
		hover: {
			background: palette.primary[600],
			color: palette.black[900],
		},
		active: palette.primary[700],
		loader: {
			baseColor: palette.primary[900],
			overlay: palette.primary[500],
			color: palette.black[900],
		},
	},
	Default: {
		default: {
			background: palette.black[600],
			color: palette.white[100],
			boxShadow: {
				inset: palette.black[400],
				outset: palette.black[800],
			},
		},
		hover: {
			background: palette.black[600],
			color: palette.white[100],
		},
		active: palette.black[500],
		loader: {
			baseColor: palette.black[400],
			overlay: palette.black[700],
			color: palette.white[100],
		},
	},
	Success: {
		default: {
			background: palette.correct[500],
			color: palette.black[900],
			boxShadow: {
				inset: palette.correct[300],
				outset: palette.correct[900],
			},
		},
		hover: {
			background: palette.correct[600],
			color: palette.black[900],
		},
		active: palette.correct[700],
		loader: {
			baseColor: palette.correct[900],
			overlay: palette.correct[500],
			color: palette.black[900],
		},
	},
	Error: {
		default: {
			background: palette.error[500],
			color: palette.black[900],
			boxShadow: {
				inset: palette.error[300],
				outset: palette.error[900],
			},
		},
		hover: {
			background: palette.error[600],
			color: palette.black[900],
		},
		active: palette.error[700],
		loader: {
			baseColor: palette.error[900],
			overlay: palette.error[500],
			color: palette.black[900],
		},
	},
};

const variants = {
	Primary: createButtonVariant(variantsConfig.Primary),
	Default: createButtonVariant(variantsConfig.Default),
	Success: createButtonVariant(variantsConfig.Success),
	Error: createButtonVariant(variantsConfig.Error),
};

const transitions = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};

export const Button = Object.fromEntries(
	Object.entries(variants).map(([key, StyledButton]) => [
		key,
		({ $icon, $iconPlacement = "left", $isLoading, disabled, children, ...props }: ButtonProps) => {
			return (
				<StyledButton
					inert={$isLoading}
					disabled={disabled}
					$icon={$icon}
					$iconPlacement={$iconPlacement}
					$alignItems="center"
					$justifyContent="center"
					$padding={[0, $icon && !children ? 15 : 24]}
					$borderRadius={8}
					$isLoading={$isLoading}
					$reverse={$iconPlacement === "right"}
					{...props}
				>
					{$icon}
					{children && <Label.M>{children}</Label.M>}
					<AP>
						{$isLoading && (
							<m.div {...transitions}>
								<Loader
									$overlay={variantsConfig[key as keyof typeof variantsConfig].loader.overlay}
									$baseColor={variantsConfig[key as keyof typeof variantsConfig].loader.baseColor}
									$color={variantsConfig[key as keyof typeof variantsConfig].loader.color}
								/>
							</m.div>
						)}
					</AP>
				</StyledButton>
			);
		},
	]),
);
