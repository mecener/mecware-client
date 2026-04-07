/* import { useRef, useState, type FC } from "react";
import styled from "styled-components";
import Block from "../../Primitives/Block";
import { palette } from "@/style/colorPalette";
import { Label } from "../../Primitives/Typography";
import { Icon } from "../../Primitives/Icon";
import { AnimatePresence as AP, motion as m } from "framer-motion";
import Flex from "../../Primitives/Flex";
import { useEscape } from "@/hooks/useEscape";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface IDropdown {
	fill?: boolean;
	align?: "center" | "right" | "left";
}

interface SelectboxProps {
	value: SelectboxValue | null;
	onChange: (value: SelectboxValue) => void;
	variants: SelectboxValue[];
	placeholder?: string;
	placeholderType?: "inner" | "outer";
	dropdown?: IDropdown;
}

const Placeholder = styled(Label.M)`
	color: ${palette.neutral[300]};
	transition: 100ms;
`;

const ArrowDownContainer = styled(Block)`
	color: ${palette.neutral[300]};
	transition: 100ms;

	svg {
		width: 12px;
	}
`;

const StyledSelectbox = styled(Block)<{ $isOpened: boolean; $hasValue: boolean }>`
	position: relative;
	z-index: 1;

	border: 1px solid ${palette.neutral[100]};
	background-color: ${palette.neutral[50]};

	outline-offset: 1px;
	outline: 2px solid transparent;

	transition: 100ms;
	cursor: pointer;

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			border-color: ${palette.neutral[200]};

			${Placeholder} {
				color: ${palette.neutral[400]};
			}

			${ArrowDownContainer} {
				background-color: ${palette.neutral[100]};
				color: ${palette.neutral[400]};
			}
		}
	}

	${({ $isOpened }) =>
		$isOpened &&
		`
			border-color: ${palette.primary[400]};
			outline-color: ${palette.primary[200]};

			${ArrowDownContainer} {
				background-color: ${palette.primary[100]};
				color: ${palette.primary[400]};
			}

			@media (hover: hover) and (pointer: fine) {
				&:hover {
					border-color: ${palette.primary[400]};

					${ArrowDownContainer} {
						background-color: ${palette.primary[100]};
						color: ${palette.primary[400]};
					}
				}
			}
	`}

	${({ $hasValue }) =>
		$hasValue &&
		`
		border-color: ${palette.neutral[300]};
	`}
`;

export interface SelectboxValue {
	text: string;
	value: string;
	icon?: string | React.ReactNode;
}

const DropdownItem = styled(Block)`
	background-color: ${palette.neutral[50]};
	cursor: pointer;

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			background-color: ${palette.neutral[100]};
		}
	}
`;

const DropdownContent = styled(Block)<{ $align?: IDropdown["align"] }>`
	position: absolute;
	z-index: 0;
	top: 100%;
	${({ $align }) => ($align === "left" ? `left: 4px` : $align === "center" ? "left: 50%" : "right: 4px")};
	translate: ${({ $align }) => ($align === "center" ? "-50%" : "0")} 8px;
`;

const SelectboxWrapper = styled(Flex)`
	position: relative;
	user-select: none;
`;

const Selectbox: FC<SelectboxProps> = ({ value, placeholder, placeholderType = "inner", dropdown, variants, onChange }) => {
	const [isOpened, setIsOpened] = useState<boolean>(false);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const transitions = {
		initial: { opacity: 0, scale: 0.95, y: -10 },
		animate: { opacity: 1, scale: 1, y: 0 },
		exit: { opacity: 0, scale: 0.95, y: -10 },
	};

	useEscape(() => setIsOpened(false));
	useOutsideClick(wrapperRef, () => setIsOpened(false));

	return (
		<SelectboxWrapper ref={wrapperRef} $column $gap={placeholderType === "outer" ? 8 : undefined}>
			{placeholder && placeholderType === "outer" && (
				<Block $padding={[0, 4]}>
					<Placeholder>{placeholder}</Placeholder>
				</Block>
			)}
			<StyledSelectbox
				$isOpened={isOpened}
				$justifyContent="space-between"
				$borderRadius={8}
				$height="44px"
				$gap={20}
				$alignItems="center"
				$padding={[0, 4, 0, 14]}
				$hasValue={!!value}
				onClick={() => setIsOpened((prev) => !prev)}
			>
				{placeholder && placeholderType === "inner" ? (
					<Placeholder>{placeholder}</Placeholder>
				) : (
					<Flex $alignItems="center" $gap={8}>
						{typeof value?.icon === "string" ? <img src={value?.icon} /> : value?.icon}
						<Label.M>{value?.text}</Label.M>
					</Flex>
				)}
				<ArrowDownContainer $borderRadius={8} $justifyContent="center" $alignItems="center" $height="34px" $width="34px">
					<Icon.ArrowDown />
				</ArrowDownContainer>
			</StyledSelectbox>
			<AP mode="wait" initial={false}>
				{isOpened && (
					<m.div {...transitions}>
						<DropdownContent
							$border={`1px solid ${palette.neutral[200]}`}
							$bgc={palette.neutral[50]}
							$maxWidth={`calc(100% - 8px)`}
							$borderRadius={8}
							$padding={7}
							$width={dropdown?.fill ? "100%" : "max-content"}
							$column
							$align={dropdown?.align}
						>
							{variants.map((variant, index) => (
								<DropdownItem
									onClick={() => {
										onChange(variant);
										setIsOpened(false);
									}}
									$borderRadius={4}
									$padding={[8, 12]}
									$alignItems="center"
									$gap={8}
									key={index}
								>
									{typeof variant.icon === "string" ? <img src={variant.icon} /> : variant.icon}
									<Label.M>{variant.text}</Label.M>
								</DropdownItem>
							))}
						</DropdownContent>
					</m.div>
				)}
			</AP>
		</SelectboxWrapper>
	);
};

export default Selectbox;
 */
