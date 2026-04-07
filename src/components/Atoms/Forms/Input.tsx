import Block from "@/components/Primitives/Block";
import { Icon } from "@/components/Primitives/Icon";
import { Body, Label } from "@/components/Primitives/Typography";
import { palette } from "@/style/colorPalette";
import type { FC } from "react";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { AnimatePresence as AP, motion as m } from "framer-motion";
import Tooltip from "../UI/Tooltip";
import { ErrorMessage, StrengthMeter } from "@/pages/Auth/Elements";

/*
	<Continue.Here/>
	
	= hi, bruh, we need error tooltip on hover, you understand?
	= love you, 25.03.2026 00:12
*/

const transitions = {
	initial: { opacity: 0, height: 0, width: 140 },
	animate: { opacity: 1, height: "auto", width: "auto" },
	exit: { opacity: 0, height: 0, width: 140 },
};

type InputTypes = "text" | "password" | "number";

interface InputProps {
	required?: boolean;
	type?: InputTypes;
	strengthMeter?: boolean;
	canTogglePassword?: boolean;
	value: string;
	placeholder?: string;
	icon?: React.FC;
	onChange: (value: string) => void;
	onBlur?: () => void;
	hasError?: boolean;
	errorMessage?: string;
	tooltipMessage?: string;
	info?: string;
	isDirty?: boolean;
	disabled?: boolean;
	min?: boolean;
	onClick?: (event: React.MouseEvent) => void;
}

const StyledInput = styled.input<{ $hasIcon: boolean; $min?: boolean }>`
	border-radius: 8px;
	height: 46px;
	background-color: ${palette.black[600]};
	box-shadow:
		inset 0 1px 0 0 ${palette.black[400]},
		0 2px 0 0 ${palette.black[800]};
	width: ${({ $min }) => ($min ? "200px" : "320px")};
	padding: 0 16px 1px ${({ $hasIcon }) => ($hasIcon ? "50px" : "16px")};
	color: ${palette.white[500]};
	font-weight: 500;
	font-size: 16px;
	transition: 199ms;
	font-family: ${import.meta.env.VITE_PRIMARY_FONT};

	&:disabled {
	}
`;

const IconContainer = styled.div<{ $right?: boolean; $highlight?: boolean; onClick?: () => void }>`
	position: absolute;
	width: 34px;
	height: 34px;
	text-align: center;
	line-height: 34px;
	${({ $right }) => ($right ? "right: 10px" : "left: 10px")};
	top: 50%;
	translate: 0 -50%;
	color: ${palette.gray[900]};
	background-color: ${palette.black[500]};
	border-radius: 8px;
	box-shadow:
		inset 0 1px 0 0 ${palette.black[300]},
		0 2px 0 0 ${palette.black[700]};
	transition: 199ms;

	svg {
		translate: 0 -1px;
		width: 16px;
		height: 16px;
	}

	${({ onClick }) =>
		!!onClick
			? css`
					@media (hover: hover) and (pointer: fine) {
						&:hover {
							cursor: pointer;
							color: ${palette.white[100]};
							box-shadow:
								inset 0 0px 0 0 ${palette.black[300]},
								0 2px 0 0 ${palette.black[700]};
						}
					}

					&:active {
						translate: 0 calc(-50% + 1px);
						box-shadow:
							inset 0 0px 0 0 ${palette.black[300]},
							0 0px 0 0 ${palette.black[700]};
					}
				`
			: css`
					pointer-events: none;
				`}

	${({ $highlight }) =>
		$highlight &&
		css`
			color: ${palette.correct[500]};
		`}
`;

const Wrapper = styled(Block)<{ $disabled?: boolean }>`
	transition: 199ms;

	${({ $disabled }) =>
		$disabled &&
		css`
			opacity: 0.25;
			scale: 0.95;
			pointer-events: none;
		`}
`;

const InputContainer = styled(Block)<{ $hasFocus: boolean; $hasError?: boolean; $disabled?: boolean }>`
	transition: 199ms;

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			${StyledInput} {
				box-shadow:
					inset 0 0px 0 0 ${palette.black[400]},
					0 1px 0 0 ${palette.black[800]};
			}
			${IconContainer} {
				&:first-of-type {
					box-shadow:
						inset 0 0px 0 0 ${palette.black[300]},
						0 1px 0 0 ${palette.black[700]};
				}
			}
		}
	}

	${({ $hasFocus }) =>
		$hasFocus &&
		css`
			border-color: ${palette.black[600]};

			${StyledInput} {
				box-shadow:
					inset 0 0px 0 0 ${palette.black[400]},
					0 0px 0 0 ${palette.black[800]};
			}

			${IconContainer} {
				&:first-of-type {
					color: ${palette.primary[500]};
				}
			}

			&:hover {
				${StyledInput} {
					border-color: ${palette.primary[500]};
					box-shadow:
						inset 0 0px 0 0 ${palette.black[400]},
						0 0px 0 0 ${palette.black[800]};
				}

				${IconContainer} {
					&:first-of-type {
						color: ${palette.primary[500]};
						box-shadow:
							inset 0 0px 0 0 ${palette.black[300]},
							0 1px 0 0 ${palette.black[700]};
					}
				}
			}
		`}

	${({ $hasError }) =>
		$hasError &&
		css`
			border-color: ${palette.error[500]};

			${IconContainer} {
				&:first-of-type {
					color: ${palette.error[500]};
				}
			}

			@media (hover: hover) and (pointer: fine) {
				&:hover {
					${IconContainer} {
						&:first-of-type {
							color: ${palette.error[500]};
						}
					}
				}
			}
		`}
`;

const Placeholder = styled(Label.M)<{ $required?: boolean }>`
	${({ $required }) =>
		$required &&
		css`
			&::after {
				content: " *";
				color: ${palette.error[500]};
				font-size: 14px;
				line-height: calc(14px * 1.4);
			}
		`}
`;

const Input: FC<InputProps> = ({
	required,
	type = "text",
	strengthMeter,
	canTogglePassword,
	value,
	placeholder,
	icon,
	onChange,
	onClick,
	onBlur,
	hasError,
	errorMessage,
	tooltipMessage,
	info,
	isDirty,
	disabled,
	min,
}) => {
	const [hasFocus, setFocus] = useState<boolean>(false);
	const [inputType, setInputType] = useState<InputTypes>(type);
	const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

	return (
		<Wrapper $disabled={disabled} $relative $column $gap={8}>
			{placeholder && (
				<Placeholder $required={required} $color={palette.white[900]}>
					{placeholder}
				</Placeholder>
			)}
			<InputContainer
				$borderRadius={12}
				$padding="2px"
				$margin="-4px"
				$border={"2px solid transparent"}
				$hasError={hasError}
				$hasFocus={hasFocus}
				$relative
				$disabled={disabled}
				onClick={onClick}
			>
				<StyledInput
					type={inputType}
					value={value}
					onChange={(event) => onChange(event.target.value)}
					onBlur={() => {
						if (onBlur) onBlur();
						setFocus(false);
					}}
					onFocus={() => setFocus(true)}
					$hasIcon={!!icon}
					disabled={disabled}
					inert={disabled}
					$min={min}
				/>
				{icon && <IconContainer $highlight={isDirty && !hasError}>{React.createElement(icon)}</IconContainer>}
				{type === "password" && canTogglePassword && (
					<IconContainer onClick={() => setInputType(inputType === "text" ? "password" : "text")} $right>
						{inputType === "password" ? <Icon.Visibility /> : <Icon.VisibilityOff />}
					</IconContainer>
				)}
			</InputContainer>
			<AP>
				{hasError && (
					<m.div {...transitions}>
						<ErrorMessage
							onMouseEnter={() => setIsTooltipVisible(true)}
							onMouseLeave={() => setIsTooltipVisible(false)}
							message={errorMessage || ""}
						>
							{tooltipMessage && (
								<AP>
									{isTooltipVisible && (
										<Tooltip $maxWidth="200px" $side="right" $contentPlacement="start">
											{tooltipMessage}
										</Tooltip>
									)}
								</AP>
							)}
						</ErrorMessage>
					</m.div>
				)}
			</AP>
			{info && (
				<Block $maxWidth="320px">
					<Body.XS $color={palette.gray[600]}>{info}</Body.XS>
				</Block>
			)}
			{strengthMeter && <StrengthMeter value={value} />}
		</Wrapper>
	);
};

export default Input;
