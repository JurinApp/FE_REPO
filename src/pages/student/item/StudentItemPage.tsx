import ItemContainer from "@/components/student/studentItem/itemHome/StudentItemContainer";
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
			isUseItemTab: true,
		});
	}, []);

	return (
		<div>
			<ItemContainer />
		</div>
	);
};

export default StudentItemPage;
