import type { FC } from "react";
import styled from "styled-components";
import Block from "../Primitives/Block";
import { palette } from "@/style/colorPalette";
import Logo from "@assets/logo.svg?react";
import { Link } from "react-router-dom";
import Navbar from "../Molecules/Navbar";
import Flex from "../Primitives/Flex";
import { Button } from "../Atoms/Forms/Button";
import { Icon } from "../Primitives/Icon";
import { useActions } from "@/hooks/useActions";
import { useSignOutMutation } from "@/services/api";

const StyledSidebar = styled(Block).attrs({ as: "aside" })`
	position: fixed;
	top: 8px;
	left: 8px;
	width: 220px;
	z-index: 1;
`;

const StyledLogo = styled(Link)`
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
	background-color: ${palette.black[600]};
	box-shadow:
		inset 0 1px 0 0 ${palette.black[400]},
		0 2px 0 0 ${palette.black[900]};

	transition: 199ms;

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			box-shadow:
				inset 0 0px 0 0 ${palette.black[400]},
				0 1px 0 0 ${palette.black[900]};
		}
	}

	&:active {
		translate: 0 1px;
		box-shadow:
			inset 0 0px 0 0 ${palette.black[400]},
			0 0px 0 0 ${palette.black[900]};
	}
`;

const Actions = styled(Flex)`
	margin: auto 0 0 0;
`;

const Sidebar: FC = () => {
	const { logOut } = useActions();

	const [signOut] = useSignOutMutation();

	const signOutHandler = async (): Promise<void> => {
		await signOut()
			.unwrap()
			.then((response) => console.log(response));
	};

	return (
		<StyledSidebar
			$column
			$gap={32}
			$padding={20}
			$borderRadius={[12, 0, 0, 12]}
			$height={"calc(100% - 16px)"}
			$bgc={palette.black[800]}
		>
			<Flex $gap={8}>
				<StyledLogo to={"/"}>
					<Logo />
				</StyledLogo>
			</Flex>
			<Navbar />
			<Actions>
				<Button.Default
					onClick={() => {
						logOut();
						signOutHandler();
					}}
					$fill
					$icon={<Icon.Logout />}
				>
					Logout
				</Button.Default>
			</Actions>
		</StyledSidebar>
	);
};

export default Sidebar;
