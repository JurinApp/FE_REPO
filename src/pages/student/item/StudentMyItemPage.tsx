import MyItemContainer from "@/components/studentItem/myItem/MyItemContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const StudentMyItemPage = () => {
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
			<MyItemContainer />
		</div>
	);
};

export default StudentMyItemPage;
