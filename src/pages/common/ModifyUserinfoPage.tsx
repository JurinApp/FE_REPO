import { ModifyUserinfoContainer } from "@/components/modifyUserinfo/ModifyUserinfoContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const ModifyUserinfoPage = () => {
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
			<ModifyUserinfoContainer />
		</div>
	);
};

export default ModifyUserinfoPage;
