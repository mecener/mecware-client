import { useEffect, type RefObject } from "react";

export const useOutsideClick = <T extends HTMLElement>(ref: RefObject<T | null>, callback: () => void): void => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) callback();
		};

		document.addEventListener("click", handleClickOutside);

		return () => document.removeEventListener("click", handleClickOutside);
	}, [ref, callback]);
};
