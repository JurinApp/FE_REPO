import { headerMenuUseState } from "@/states/headerMenuUseState";
import SignUpContainer from "@components/signUp/SignUpContainer";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const SignUpPage = () => {
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
			<SignUpContainer />
		</div>
	);
};

export default SignUpPage;
