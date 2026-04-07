import Block from "@/components/Primitives/Block";
import Flex from "@/components/Primitives/Flex";
import { palette } from "@/style/colorPalette";
import { useEffect, useState, type FC } from "react";
import { Body, Heading, Label } from "@/components/Primitives/Typography";
import styled from "styled-components";
import { Button } from "@/components/Atoms/Forms/Button";
import Logo from "@assets/logo.svg?react";
import { AnimatePresence as AP, motion as m } from "framer-motion";
import { Icon } from "@/components/Primitives/Icon";

const transitions = {
	initial: { opacity: 0, height: 0 },
	animate: { opacity: 1, height: "auto" },
	exit: { opacity: 0, height: 0 },
};

const Form = styled(Flex).attrs({ as: "form" })``;

const StyledErrorMessage = styled(Block)`
	max-width: 320px;
	margin: 4px 2px 0 2px;
	background-color: rgba(252, 61, 61, 0.075);
	border-radius: 8px;
	padding: 8px 12px 6px;
	transition: 199ms;
	box-shadow:
		inset 0 1px 0 0 rgba(255, 153, 153, 0.1),
		0 2px 0 0 rgba(221, 13, 13, 0.05);

	&,
	${Label.S} {
		color: ${palette.error[500]};
	}

	svg {
		width: 12px;
		height: 12px;
		translate: 0 1px;
	}

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			box-shadow:
				inset 0 0px 0 0 rgba(255, 153, 153, 0.1),
				0 1px 0 0 rgba(221, 13, 13, 0.05);
		}
	}
`;

interface ErrorMessageProps {
	relative?: boolean;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	message: string;
	children?: React.ReactNode;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message, children, ...props }) => {
	return (
		<StyledErrorMessage $relative $gap={4} {...props}>
			<Icon.Error />
			<Label.S>{message}</Label.S>
			{children}
		</StyledErrorMessage>
	);
};

interface AuthContainerProps {
	title: string;
	buttonText: string;
	buttonIcon?: React.ReactNode;
	onSubmit: () => void;
	extra?: React.ReactNode;
	errorMessage?: string;
	disableButton?: boolean;
	loading?: boolean;
	children: React.ReactNode;
}

export const AuthContainer: FC<AuthContainerProps> = ({
	title,
	buttonText,
	buttonIcon,
	onSubmit,
	extra,
	errorMessage,
	disableButton,
	loading,
	children,
}) => {
	const submitHandler = (event: React.SubmitEvent<HTMLFormElement>): void => {
		event.preventDefault();

		onSubmit();
	};

	return (
		<Flex $gap={32} $column $alignItems="center">
			<Block $column $gap={32} $padding={32} $bgc={palette.black[700]} $borderRadius={16}>
				<Flex $gap={4} $column $alignItems="center">
					<Logo width={60} height={60} />
					<Heading.H3>{title}</Heading.H3>
				</Flex>
				<Form onSubmit={submitHandler} $column $gap={32}>
					{children}
					<Flex $column $gap={12}>
						{errorMessage && (
							<AP>
								{errorMessage.length !== 0 && (
									<m.div {...transitions}>
										<ErrorMessage message={errorMessage || ""} />
									</m.div>
								)}
							</AP>
						)}
						<Button.Primary $isLoading={loading} disabled={disableButton} $icon={buttonIcon}>
							{buttonText}
						</Button.Primary>
					</Flex>
				</Form>
			</Block>
			{extra}
		</Flex>
	);
};

interface StergthMeterProps {
	value: string;
}

export const StrengthMeter: FC<StergthMeterProps> = ({ value }) => {
	const [strengthLevel, setStrengthLevel] = useState<number>(0);
	const [strengthColor, setStrengthColor] = useState<string>(palette.gray[700]);

	useEffect(() => {
		const isContainLowerCase = /[a-z]/g.test(value);
		const isContainUpperCase = /[A-Z]/g.test(value);
		const isContainDigit = /\d/g.test(value);
		const isContainSpecial = /[!@#$%^&.,*()\-_+=~]/g.test(value);
		const isLong = value.length >= 12;

		setStrengthLevel(
			(isContainLowerCase ? 1 : 0) +
				(isContainUpperCase ? 1 : 0) +
				(isContainDigit ? 1 : 0) +
				(isContainSpecial ? 1 : 0) +
				(isLong ? 1 : 0),
		);
	}, [value]);

	useEffect(() => {
		switch (strengthLevel) {
			case 1:
				setStrengthColor(palette.error[500]);
				break;
			case 2:
				setStrengthColor("#F5B43B");
				break;
			case 3:
				setStrengthColor(palette.progress[500]);
				break;
			case 4:
				setStrengthColor(palette.correct[500]);
				break;
			case 5:
				setStrengthColor(palette.primary[500]);
				break;
			default:
				setStrengthColor(palette.gray[700]);
		}
	}, [strengthLevel]);

	const getMessage = (strengthLevel: number): string => {
		switch (strengthLevel) {
			case 0:
				return "Let's create a masterpiece";
			case 1:
				return "Is that your dog's name?";
			case 2:
				return "We've seen better";
			case 3:
				return "Almost interesting";
			case 4:
				return "Decent, not legendary";
			case 5:
				return "Unbreakable. Hacker will cry";
			default:
				return "Unknown error, maybe front-end developer is asshole";
		}
	};

	return (
		<Flex $column>
			<Flex $justifyContent="space-between" $alignItems="baseline">
				<Label.S $color={palette.gray[900]}>Password strength</Label.S>
				<Body.XS style={{ transition: "400ms ease-in-out" }} $color={strengthColor}>
					{getMessage(strengthLevel)}
				</Body.XS>
			</Flex>
			<Block $margin={[2, 0, 0, 0]} $borderRadius={2} $height="4px" $width="100%" $bgc={palette.black[500]} $relative>
				<Block
					style={{ transition: "400ms ease-in-out" }}
					$height="4px"
					$bgc={strengthColor}
					$borderRadius={2}
					$width={20 * strengthLevel + "%"}
				/>
			</Block>
		</Flex>
	);
};
