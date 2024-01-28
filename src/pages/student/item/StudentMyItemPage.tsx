import StudentItemTab from "@/components/studentItem/StudentItemTab";
import MyItemContainer from "@/components/studentItem/MyItemContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import React, { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const StudentMyItemPage = () => {
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
			<StudentItemTab />
			<MyItemContainer />
		</div>
	);
};

export default StudentMyItemPage;
