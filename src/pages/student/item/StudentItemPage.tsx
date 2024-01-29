import StudentItemTab from "@/components/studentItem/StudentItemTab";
import ItemContainer from "@/components/studentItem/ItemContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const StudentItemPage = () => {
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
			<ItemContainer />
		</div>
	);
};

export default StudentItemPage;
