import { useAppSelector } from "@/hooks/useAppSelector";
import type { FC } from "react";
import ModalWrapper from "../ModalWrapper";
import { Heading } from "@/components/Primitives/Typography";
import Flex from "@/components/Primitives/Flex";

const NewScenario: FC = () => {
	const { newScenario: isActive } = useAppSelector((state) => state.modal);

	return (
		<ModalWrapper $isActive={isActive} $name="newScenario">
			<Flex $column $alignItems="center">
				<Heading.H3>Create new scenario</Heading.H3>
			</Flex>
		</ModalWrapper>
	);
};

export default NewScenario;
