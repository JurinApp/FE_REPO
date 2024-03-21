import { useSetRecoilState } from "recoil";
import { useLayoutEffect } from "react";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import MyPageContainer from "@/components/myPage/MyPageContainer";

const MyPage = () => {
	const setIsUseHeader = useSetRecoilState(headerMenuUseState);

	useLayoutEffect(() => {
		setIsUseHeader({
			isUseHeader: true,
			isUseMenu: false,
			isUseTab: false,
			isUseItemTab: false,
		});
	}, []);

	return (
		<div>
			<MyPageContainer />
		</div>
	);
};

export default MyPage;
