import ArticleContainer from "@/components/student/studentPost/ArticleContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import React, { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const ArticlePage = () => {
	const setIsUseHeader = useSetRecoilState(headerMenuUseState);

	useLayoutEffect(() => {
		setIsUseHeader({
			isUseHeader: false,
			isUseMenu: true,
			isUseTab: false,
		});
	}, []);
	return (
		<div>
			<ArticleContainer />
		</div>
	);
};

export default ArticlePage;
