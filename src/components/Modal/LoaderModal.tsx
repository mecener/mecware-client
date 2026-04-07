import { useAppSelector } from "@/hooks/useAppSelector";
import type { FC } from "react";
import ModalWrapper from "./ModalWrapper";
import Loader from "../Primitives/Loader";
import { palette } from "@/style/colorPalette";

const LoaderModal: FC = () => {
	const { loader: isActive } = useAppSelector((state) => state.modal);

	return (
		<ModalWrapper $isActive={isActive} $name="loader">
			<div style={{ scale: 5 }}>
				<Loader $color={palette.primary[500]} $baseColor={palette.gray[900]} />
			</div>
		</ModalWrapper>
	);
};

export default LoaderModal;
