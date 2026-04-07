import type { FC } from "react";
import Block from "./Block";
import type { FlexProps } from "./Flex";

interface ContainerProps extends FlexProps {
	children?: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children, ...props }) => {
	return (
		<Block $margin={[0, "auto"]} $maxWidth="1224px" $padding={[0, 20]} $width="100%" {...props}>
			{children}
		</Block>
	);
};

export default Container;
