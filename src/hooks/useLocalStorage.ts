import { useEffect } from "react";

export const useLocalStorage = <T>(key: string, callback: (data: T) => void, emptyCallback?: () => void): void => {
	useEffect(() => {
		const data = localStorage.getItem(key);

		if (data) {
			const parsedData = JSON.parse(data);

			callback(parsedData);
		} else {
			if (emptyCallback) emptyCallback();
		}
	}, [key]);
};
