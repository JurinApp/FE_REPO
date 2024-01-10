import { headerMenuUseState } from "@/states/headerMenuUseState";
import LoginContainer from "@components/login/LoginContainer";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const LoginPage = () => {
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
			<LoginContainer />
		</div>
	);
};

export default LoginPage;
