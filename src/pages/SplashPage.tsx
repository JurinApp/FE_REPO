import SplashContainer from "@/components/splash/SplashContainer";
import { headerState } from "@/states/headerState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const SplashPage = () => {
	const setIsUseHeader = useSetRecoilState(headerState);

	useLayoutEffect(() => {
		setIsUseHeader(false);
	}, []);

	return (
		<div>
			<SplashContainer />
		</div>
	);
};

export default SplashPage;
