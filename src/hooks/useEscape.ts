import { useEffect } from "react";

export const useEscape = (callback: () => void): void => {
	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") callback();
		};

		document.addEventListener("keydown", handleEscapeKey);

		return () => document.removeEventListener("keydown", handleEscapeKey);
	}, [callback]);
};
