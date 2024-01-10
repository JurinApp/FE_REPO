import SettingContainer from "@/components/setting/SettingContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const SettingPage = () => {
	const setIsUseHeader = useSetRecoilState(headerMenuUseState);

	useLayoutEffect(() => {
		setIsUseHeader({
			isUseHeader: true,
			isUseMenu: false,
			isUseTab: false,
		});
	}, []);

	return (
		<div>
			<SettingContainer />
		</div>
	);
};

export default SettingPage;
