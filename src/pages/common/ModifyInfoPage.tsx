import ModifyInfoContainer from "@/components/myPage/modifyInfo/ModifyInfoContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const ModifyInfoPage = () => {
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
			<ModifyInfoContainer />
		</div>
	);
};

export default ModifyInfoPage;
