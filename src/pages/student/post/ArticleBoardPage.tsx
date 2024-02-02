import ArticleBoardContainer from "@/components/student/studentPost/ArticleBoardContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import React, { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const ArticleBoardPage = () => {
	const setIsUseHeader = useSetRecoilState(headerMenuUseState);

	useLayoutEffect(() => {
		setIsUseHeader({
			isUseHeader: true,
			isUseMenu: true,
			isUseTab: false,
		});
	}, []);
	return (
		<div>
			<ArticleBoardContainer />
		</div>
	);
};

export default ArticleBoardPage;
