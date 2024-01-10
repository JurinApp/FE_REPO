import SplashContainer from "@/components/splash/SplashContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const SplashPage = () => {
	const setIsUseHeader = useSetRecoilState(headerMenuUseState);

	useLayoutEffect(() => {
		setIsUseHeader({
			isUseHeader: false,
			isUseMenu: false,
			isUseTab: false,
		});
	}, []);

	return (
		<div>
			<SplashContainer />
		</div>
	);
};

export default SplashPage;
