import { Button } from "@/components/Atoms/Forms/Button";
import Input from "@/components/Atoms/Forms/Input";
import Tooltip from "@/components/Atoms/UI/Tooltip";
import Block from "@/components/Primitives/Block";
import Flex from "@/components/Primitives/Flex";
import { Icon } from "@/components/Primitives/Icon";
import { Body, Code, Heading, Label, Overline } from "@/components/Primitives/Typography";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useInput } from "@/hooks/useInput";
import { type ContentItem, type DialogueLine, type ScenarioAttributes } from "@/services/api.types";
import type { User } from "@/store/slices/users";
import { palette } from "@/style/colorPalette";
import { useEffect, useRef, useState, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { AnimatePresence as AP, motion as m } from "framer-motion";
import { useAddContributionMutation, useChangeSelectedContributionMutation } from "@/services/api";
import { useActions } from "@/hooks/useActions";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const BackLink = styled(Flex)`
	cursor: pointer;
	transition: 199ms;

	&,
	span {
		transition: 199ms;
		color: ${palette.white[900]};
	}

	svg {
		transition: 199ms;
		width: 12px;
		height: 12px;
	}

	span {
		padding: 2px 0 0 0;
	}

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			&,
			span {
				color: ${palette.white[500]};
			}
		}
	}
`;

const Scenario: FC = () => {
	const navigate = useNavigate();

	const { id } = useParams();

	const { scenarios } = useAppSelector((state) => state.scenario);
	const { users } = useAppSelector((state) => state.user);
	const { id: myId } = useAppSelector((state) => state.auth);

	const [scenario, setScenario] = useState<ScenarioAttributes | null>(null);

	useEffect(() => {
		if (id && (scenarios.my.length > 0 || scenarios.shared.length > 0)) {
			const allMyScenarios = [...scenarios.my, ...scenarios.shared];

			const candidate = allMyScenarios.filter((scenario) => scenario.id === +id);

			if (candidate[0]) {
				setScenario(candidate[0]);
			}
		}
	}, [id, scenarios]);

	return (
		scenario && (
			<Block $height="100%" $justifyContent="space-between" $gap={20}>
				<Block $height="100%" $column $gap={12}>
					<BackLink $alignItems="center" $gap={4} onClick={() => navigate(-1)}>
						<Icon.ArrowBack />
						<Label.M>Back</Label.M>
					</BackLink>
					<Flex $column $gap={8}>
						<Heading.H3 $isCyrillic={/[а-яА-Я]/g.test(scenario.title)}>{scenario.title}</Heading.H3>
						<Body.S $color={palette.gray[700]} $isCyrillic={/[а-яА-Я]/g.test(scenario.description || "")}>
							{scenario.description}
						</Body.S>
					</Flex>
					<Block $column $gap={12} $height="100%" $padding={20} $borderRadius={12} $bgc={palette.black[500]}>
						{scenario.content.dialogues.map((line, index) => (
							<DialogueItem
								authorId={scenario.authorId}
								userId={myId || 0}
								scenarioId={scenario.id}
								dialogueId={line.id}
								scenario={scenario}
								key={index}
								{...line}
							/>
						))}
					</Block>
				</Block>
				<Flex $alignItems="flex-end" $column $gap={12}>
					{scenario.authorId !== myId && (
						<Flex $alignItems="flex-end" $column $gap={4}>
							<Overline.S $color={palette.gray[900]}>Author</Overline.S>
							<UserCard {...users.filter((user) => user.id === scenario.authorId)[0]} />
						</Flex>
					)}
					<Flex $alignItems="flex-end" $column $gap={4}>
						<Overline.S $color={palette.gray[900]}>Contributors</Overline.S>
						<UserCard {...users.filter((user) => scenario.contributorIds?.includes(user.id))[0]} />
					</Flex>
				</Flex>
			</Block>
		)
	);
};

export default Scenario;

const Timestamp = styled(Block)`
	box-shadow:
		inset 0 1px 0 0 ${palette.black[400]},
		0 2px 0 0 ${palette.black[800]};
`;

const Content = styled(Body.S)`
	display: inline;

	.contribution {
		position: relative;
		cursor: pointer;
		display: inline-block;
		padding: 2px 6px;
		border-radius: 4px;
		color: ${palette.primary[500]};
		box-shadow:
			inset 0 1px 0 0 ${palette.black[200]},
			0 1px 0 0 ${palette.black[500]};
		background-color: ${palette.black[400]};

		> div {
			cursor: auto;
		}
	}
`;

const DialogueItem: FC<
	DialogueLine & { authorId: number; scenarioId: number; dialogueId: number; userId: number; scenario: ScenarioAttributes | null }
> = ({ authorId, scenarioId, dialogueId, content, character, timestamp, userId, scenario }) => {
	const parseContent = content
		.map((contentItem) => {
			if (typeof contentItem === "string") return contentItem;
			else {
				return contentItem.selectedOption === "initial"
					? contentItem.initial
					: contentItem.contributions[contentItem.selectedOption].content;
			}
		})
		.join("");

	return (
		<Block $maxWidth="576px" $column $gap={8}>
			<Flex $gap={8} $alignItems="baseline">
				<Timestamp $bgc={palette.black[600]} $borderRadius={4} $padding={[4, 8, 0, 8]}>
					<Code.S $color={palette.primary[500]}>{timestamp}</Code.S>
				</Timestamp>
				<Body.XS $color={palette.gray[900]} $isCyrillic={/[а-яА-Я]/g.test(character)}>
					{character}
				</Body.XS>
			</Flex>
			<Content $color={palette.white[300]} $isCyrillic={/[а-яА-Я]/g.test(parseContent)}>
				{content.map((contentItem, index) => (
					<Item
						authorId={authorId}
						userId={userId}
						lineId={index}
						dialogueId={dialogueId}
						scenarioId={scenarioId}
						key={index}
						data={contentItem}
						scenario={scenario}
					/>
				))}
			</Content>
		</Block>
	);
};

const SForm = styled(Flex).attrs({ as: "form" })``;

const PickItem = styled(Flex)<{ $clickable: boolean }>`
	padding: 8px 40px 8px 8px;
	margin: -8px;
	border-radius: 8px;
	transition: 199ms;
	position: relative;

	${({ $clickable }) =>
		$clickable &&
		css`
			cursor: pointer;
			@media (hover: hover) and (pointer: fine) {
				&:hover {
					background-color: ${palette.black[500]};
				}
			}
		`}
`;

const IconContainer = styled.div<{ $isVisible: boolean }>`
	position: absolute;
	right: 8px;
	top: 50%;
	translate: 0 -50%;
	display: flex;
	color: ${palette.primary[500]};
	opacity: 0;
	visibility: hidden;
	transition: 199ms;

	${({ $isVisible }) =>
		$isVisible &&
		css`
			opacity: 1;
			visibility: visible;
		`}

	&,
	svg {
		width: 16px;
		height: 16px;
	}
`;

const Item: FC<{
	authorId: number;
	data: ContentItem;
	scenarioId: number;
	dialogueId: number;
	lineId: number;
	userId: number;
	scenario: ScenarioAttributes | null;
}> = ({ authorId, scenarioId, dialogueId, lineId, userId, data, scenario }) => {
	const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

	const value = useInput("", {});

	const { setMyScenarios } = useActions();

	const { id: myId } = useAppSelector((state) => state.auth);

	const [triggerAddContribution] = useAddContributionMutation();
	const [triggerChangeSelectedContribution] = useChangeSelectedContributionMutation();

	const hasContribution = (scenario: ScenarioAttributes | null): boolean => {
		if (!scenario) return false;

		const line = scenario.content.dialogues
			.filter((dialogue) => dialogue.id === dialogueId)[0]
			.content.filter((_, index) => index === lineId)[0];

		return typeof line !== "string" ? line.contributions.some((contribution) => contribution.userId === myId) : false;
	};

	const handler = async (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log({ scenarioId, dialogueId, lineId, userId, contributionContent: value.value });

		await triggerAddContribution({ scenarioId, dialogueId, lineId, userId, contributionContent: value.value })
			.unwrap()
			.then((response) => {
				console.log(response);
				location.reload();
			});
	};

	const transitions = {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.95 },
	};

	const tooltipRef = useRef<HTMLDivElement>(null);

	useOutsideClick(tooltipRef, () => setIsTooltipVisible(false));

	return (
		<>
			{typeof data === "string" ? (
				<span>{data}</span>
			) : (
				<span ref={tooltipRef} onClick={() => setIsTooltipVisible((prev) => !prev)} className="contribution">
					{data.selectedOption === "initial" ? data.initial : data.contributions[data.selectedOption].content}
					<AP mode="wait">
						{isTooltipVisible && (
							<m.div {...transitions}>
								<Tooltip
									onClick={(event) => event.stopPropagation()}
									$maxWidth="400px"
									$side="right"
									$contentPlacement="start"
									$style="default"
								>
									<Flex $column $gap={12}>
										<PickItem
											$column
											$clickable={authorId === myId}
											onClick={async () => {
												if (authorId === myId) {
													await triggerChangeSelectedContribution({
														scenarioId,
														dialogueId,
														lineId,
														userId,
														contributionId: "initial",
													})
														.unwrap()
														.then((response) => {
															setMyScenarios(response.data);
														});
												}
											}}
										>
											<Label.S $color={palette.gray[800]}>Original</Label.S>
											<Body.XS $isCyrillic={/[а-яА-Я]/g.test(data.initial)}>{data.initial}</Body.XS>
											<IconContainer $isVisible={data.selectedOption === "initial"}>
												<Icon.Check />
											</IconContainer>
										</PickItem>
										{data.contributions.map((contribution, index) => (
											<PickItem
												$clickable={authorId === myId}
												onClick={async () => {
													if (authorId === myId) {
														await triggerChangeSelectedContribution({
															scenarioId,
															dialogueId,
															lineId,
															userId,
															contributionId: "initial",
														})
															.unwrap()
															.then((response) => {
																setMyScenarios(response.data);
															});
													}
												}}
												key={index}
												$column
											>
												<Label.S $color={palette.gray[800]}>{contribution.username}'s contribution</Label.S>
												<Body.XS $isCyrillic={/[а-яА-Я]/g.test(contribution.content)}>{contribution.content}</Body.XS>
												<IconContainer $isVisible={data.selectedOption === index}>
													<Icon.Check />
												</IconContainer>
											</PickItem>
										))}
										{!hasContribution(scenario) && (
											<SForm onSubmit={(event) => handler(event)} $gap={8} $alignItems="flex-end">
												<Input
													onClick={(event) => event.stopPropagation()}
													min
													placeholder="Add contribution"
													value={value.value}
													onChange={value.onChange}
												/>
												<Button.Primary onClick={(event) => event.stopPropagation()} $icon={<Icon.Scenario />} />
											</SForm>
										)}
									</Flex>
								</Tooltip>
							</m.div>
						)}
					</AP>
				</span>
			)}
		</>
	);
};

const StyledUserCard = styled(Block)`
	border-radius: 8px;
	background-color: ${palette.black[500]};
	padding: 4px 8px 4px 4px;
`;

const UserCard: FC<User> = ({ avatar, username }) => {
	return (
		<StyledUserCard $gap={8} $alignItems="center">
			<Avatar image={avatar || undefined} />
			<Label.M>{username}</Label.M>
		</StyledUserCard>
	);
};

const EmptyAvatar = styled(Block)`
	width: 24px;
	height: 24px;
	border-radius: 8px;
	background-color: ${palette.black[400]};
	color: ${palette.gray[900]};

	svg {
		width: 16px;
		height: 16px;
	}
`;

const StyledAvatar = styled.img`
	width: 24px;
	height: 24px;
	border-radius: 8px;
`;

const Avatar: FC<{ image?: string }> = ({ image }) => {
	return !image ? (
		<EmptyAvatar $justifyContent="center" $alignItems="center">
			<Icon.User />
		</EmptyAvatar>
	) : (
		<StyledAvatar src={image} />
	);
};
