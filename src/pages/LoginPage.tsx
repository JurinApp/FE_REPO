import { headerState } from "@/states/headerState";
import LoginContainer from "@components/login/LoginContainer";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const LoginPage = () => {
	const setIsUseHeader = useSetRecoilState(headerState);

	useLayoutEffect(() => {
		setIsUseHeader(false);
	}, []);

	return (
		<div>
			<LoginContainer />
		</div>
	);
};

export default LoginPage;
