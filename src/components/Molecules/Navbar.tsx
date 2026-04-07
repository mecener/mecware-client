import type { FC } from "react";
import Flex from "../Primitives/Flex";
import { AppRoutes } from "@/Routes";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import Block from "../Primitives/Block";
import { Label } from "../Primitives/Typography";
import { palette } from "@/style/colorPalette";
import { Icon } from "../Primitives/Icon";

const NavbarItem = styled(Block)`
	background-color: ${palette.black[700]};
	white-space: nowrap;
	color: ${palette.gray[500]};

	box-shadow:
		inset 0 1px 0 0 ${palette.black[500]},
		0 2px 0 0 ${palette.black[900]};

	transition: 199ms;

	${Label.M} {
		padding: 2px 0 0 0;
		color: ${palette.gray[500]};
	}

	svg {
		flex: 0 0 16px;
		width: 16px;
		height: 16px;
	}
`;

const Corner = styled.div<{ type: "top" | "bottom" }>`
	position: absolute;
	width: 20px;
	height: 20px;
	right: 0;
	transition: 199ms;
	color: ${palette.black[600]};
	svg {
		width: 20px;
		height: 20px;
	}

	${({ type }) =>
		type === "top"
			? css`
					bottom: 100%;
				`
			: css`
					top: 100%;
					scale: 1 -1;
				`};
`;

const StyledNavLink = styled(NavLink)<{ $inactive: boolean }>`
	padding: 0 4px 0 0;
	transition: 199ms;

	${({ $inactive }) =>
		$inactive &&
		css`
			opacity: 0.2;
			pointer-events: none;
			${NavbarItem} {
				box-shadow:
					inset 0 0px 0 0 ${palette.black[500]},
					0 0px 0 0 ${palette.black[900]};
			}
		`}

	${Corner} {
		right: -20px;
		opacity: 0;
		visibility: hidden;

		&::before {
			border-radius: 0;
		}
	}

	&.active {
		padding: 0;
		${NavbarItem} {
			background-color: ${palette.black[600]};
			color: ${palette.white[100]};
			border-radius: 8px 0 0 8px;
			box-shadow:
				inset 0 0px 0 0 ${palette.black[500]},
				0 0px 0 0 ${palette.black[900]};

			${Label.M} {
				color: ${palette.white[100]};
			}
		}
		${Corner} {
			right: 0;
			opacity: 1;
			visibility: visible;

			&::before {
				border-radius: 10px;
			}

			&,
			&::before {
				transition:
					opacity 199ms 199ms,
					border-radius 199ms 199ms,
					background-color 199ms;
			}
		}
	}

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			${Label.M} {
				color: ${palette.gray[500]};
			}
		}
	}
`;

const Navbar: FC = () => {
	const routes = Object.values(AppRoutes);
	const items = routes.filter((route) => route.renderOnSidebar);

	return (
		<nav>
			<Flex $column $gap={4}>
				{items.map((item, index) => (
					<StyledNavLink $inactive={item.active === false} to={item.path} key={index}>
						<NavbarItem
							$relative
							$alignItems="center"
							$borderRadius={8}
							$padding={[12, 36, 12, 16]}
							$margin={[0, -20, 0, 0]}
							$gap={8}
						>
							{item.icon}
							<Label.M>{item.name}</Label.M>
							<Corner type="top">
								<Icon.Corner />
							</Corner>
							<Corner type="bottom">
								<Icon.Corner />
							</Corner>
						</NavbarItem>
					</StyledNavLink>
				))}
			</Flex>
		</nav>
	);
};

export default Navbar;
