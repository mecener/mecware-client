import Block from "@/components/Primitives/Block";
import { Body } from "@/components/Primitives/Typography";
import { useState, type FC } from "react";
import Flex from "@/components/Primitives/Flex";
import Input from "@/components/Atoms/Forms/Input";
import { Icon } from "@/components/Primitives/Icon";
import { useInput } from "@/hooks/useInput";
import styled from "styled-components";
import Link from "@/components/Primitives/Link";
import { AuthContainer } from "./Elements";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useActions } from "@/hooks/useActions";
import { useSignInMutation } from "@/services/api";
import type { ApiError, ApiResponse } from "@/services/api.types";
import { motion as m } from "framer-motion";

const PasswordRecoverLink = styled.div`
	position: absolute;
	top: 0;
	right: 0;
`;

const SignIn: FC = () => {
	const login = useInput("", {});
	const password = useInput("", {});
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [isFetching, setIsFetching] = useState<boolean>(false);

	const [signIn] = useSignInMutation();

	const { logIn } = useActions();

	useDocumentTitle("Sign In");

	const signInHandler = async (login: string, password: string): Promise<void> => {
		setIsFetching(true);

		await signIn({ login, password })
			.unwrap()
			.then((response) => {
				logIn({ token: response.accessToken, id: response.user.id });
			})
			.catch((error: ApiResponse<ApiError>) => {
				setErrorMessage(error.data?.message || "");
			})
			.finally(() => {
				setIsFetching(false);
			});
	};

	const submitHandler = async () => {
		if (login.value.length === 0 || password.value.length === 0) {
			return setErrorMessage("Not all fields are filled in");
		} else {
			setErrorMessage("");

			await signInHandler(login.value, password.value);
		}
	};

	const transitions = {
		initial: { opacity: 0, scale: 0.95, y: 50 },
		animate: { opacity: 1, scale: 1, y: 0 },
		exit: { opacity: 0, scale: 0.95, y: 50 },
	};

	return (
		<m.div {...transitions}>
			<AuthContainer
				title="Sign in to Mecware"
				buttonText="Sign In"
				buttonIcon={<Icon.Login />}
				onSubmit={submitHandler}
				disableButton={login.value.length === 0 || password.value.length === 0}
				errorMessage={errorMessage}
				loading={isFetching}
				extra={
					<Body.S>
						First time here? <Link to="/signup">Create an account</Link>
					</Body.S>
				}
			>
				<Flex $column $gap={20}>
					<Input
						hasError={errorMessage.length !== 0 && login.value.length === 0}
						value={login.value}
						onChange={login.onChange}
						icon={Icon.User}
						placeholder="Username or email address"
						errorMessage="Username cannot be blank"
					/>
					<Block $relative>
						<Input
							hasError={errorMessage.length !== 0 && password.value.length === 0}
							type="password"
							value={password.value}
							onChange={password.onChange}
							icon={Icon.Lock}
							placeholder="Password"
							errorMessage="Password cannot be blank"
							canTogglePassword
						/>
						<PasswordRecoverLink>
							<Link size="S" to="/recover">
								Forgot password?
							</Link>
						</PasswordRecoverLink>
					</Block>
				</Flex>
			</AuthContainer>
		</m.div>
	);
};

export default SignIn;

/*
	<Continue.Here6/>
	= very nice, bruh! ure so legend, u fix button styles, correct color
	= and signup inputs icon color, there's so pretty now, wow!
	= I think next move's are server jokes, good morning to u!
	= 28.03.2026 23:25
*/
