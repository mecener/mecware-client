import Block from "@/components/Primitives/Block";
import { Body, Display } from "@/components/Primitives/Typography";
import { useAppSelector } from "@/hooks/useAppSelector";
import { palette } from "@/style/colorPalette";
import type { FC } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledLayout = styled(Block)`
	margin: 0 0 0 220px;
	&,
	> ${Block}, .m-div {
		flex: 1 1 auto;
	}
`;

const EmailVerificationDiscalimer = styled(Block)`
	position: absolute;
	z-index: 1;
	backdrop-filter: blur(5px);
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	border-radius: 12px;
	text-align: center;
`;

const AppLayout: FC = () => {
	const { emailVerification } = useAppSelector((state) => state.modal);

	return (
		<StyledLayout $padding={[12, 12, 12, 0]} $borderRadius={[0, 12, 12, 0]} $bgc={palette.black[800]}>
			<Block $relative $padding={20} $borderRadius={12} $bgc={palette.black[600]}>
				{emailVerification && (
					<EmailVerificationDiscalimer $gap={32} $justifyContent="center" $alignItems="center" $column>
						<Display.S>
							<p>One small click for you,</p>
							<p>one giant unlock for your account</p>
						</Display.S>
						<Body.L $color={palette.gray[900]}>
							<p>We've sent a verification link to your email. Click it, or we'll start thinking you're a ghost.</p>
							<p>And ghosts can't access cool stuff. Sorry, rules of the internet.</p>
						</Body.L>
					</EmailVerificationDiscalimer>
				)}
				<Outlet />
			</Block>
		</StyledLayout>
	);
};

export default AppLayout;
