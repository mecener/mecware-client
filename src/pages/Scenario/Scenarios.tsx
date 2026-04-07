import { Button } from "@/components/Atoms/Forms/Button";
import Block from "@/components/Primitives/Block";
import Flex from "@/components/Primitives/Flex";
import { Icon } from "@/components/Primitives/Icon";
import { Body, Heading, Title } from "@/components/Primitives/Typography";
import { useActions } from "@/hooks/useActions";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { palette } from "@/style/colorPalette";
import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Scenarios: FC = () => {
	useDocumentTitle("Scenarios");

	const { setModalVisibility } = useActions();

	const { scenarios } = useAppSelector((state) => state.scenario);

	const navigate = useNavigate();

	return (
		scenarios && (
			<Flex $column $alignItems="flex-start" $gap={20}>
				<Button.Primary
					disabled
					onClick={() => setModalVisibility({ name: "newScenario", isVisible: true })}
					$icon={<Icon.Text />}
				>
					New scenario
				</Button.Primary>
				<Flex $column $gap={8}>
					<Heading.H5>My scenarios</Heading.H5>
					<Flex $wrap $gap={20}>
						{scenarios?.my.map((scenario, index) => (
							<ScenarioItem
								onClick={() => navigate("/scenarios/" + scenario.id)}
								$borderRadius={12}
								$padding={20}
								$bgc={palette.black[500]}
								$column
								$gap={4}
								key={index}
							>
								<Title.S $isCyrillic={/[а-яА-Я]/g.test(scenario.title)}>{scenario.title}</Title.S>
								<Body.XS $isCyrillic={scenario.description ? /[а-яА-Я]/g.test(scenario.description) : false}>
									{scenario.description}
								</Body.XS>
							</ScenarioItem>
						))}
					</Flex>
				</Flex>
				<Flex $column $gap={8}>
					<Heading.H5>Collaborations</Heading.H5>
					<Flex $wrap $gap={20}>
						{scenarios?.shared.map((scenario, index) => (
							<ScenarioItem
								onClick={() => navigate("/scenarios/" + scenario.id)}
								$borderRadius={12}
								$padding={20}
								$bgc={palette.black[500]}
								$column
								$gap={4}
								key={index}
							>
								<Title.S $isCyrillic={/[а-яА-Я]/g.test(scenario.title)}>{scenario.title}</Title.S>
								<Body.XS $isCyrillic={scenario.description ? /[а-яА-Я]/g.test(scenario.description) : false}>
									{scenario.description}
								</Body.XS>
							</ScenarioItem>
						))}
					</Flex>
				</Flex>
			</Flex>
		)
	);
};

export default Scenarios;

const ScenarioItem = styled(Block)`
	cursor: pointer;
	box-shadow:
		inset 0 1px 0 0 ${palette.black[300]},
		0 2px 0 0 ${palette.black[700]};
	transition: 199ms;

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			background-color: ${palette.black[400]};
			box-shadow:
				inset 0 0px 0 0 ${palette.black[300]},
				0 1px 0 0 ${palette.black[700]};
		}
	}

	&:active {
		box-shadow:
			inset 0 0px 0 0 ${palette.black[300]},
			0 0px 0 0 ${palette.black[700]};
		translate: 0 1px;
	}
`;
