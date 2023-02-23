import { useRef, useEffect } from "react";

const useDocumentTitle = (title: string, prevailOnUnmount = false) => {
	const titlePrefix = "FoodFlow - ";
	const defaultTitle = useRef(document.title);

	useEffect(() => {
		document.title = titlePrefix + title;
	}, [title]);

	useEffect(
		() => () => {
			if (!prevailOnUnmount) {
				document.title = defaultTitle.current;
			}
		},
		[]
	);
};

export default useDocumentTitle;