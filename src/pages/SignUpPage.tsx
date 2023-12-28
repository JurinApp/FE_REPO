import { headerState } from "@/states/headerState";
import SignUpContainer from "@components/signUp/SignUpContainer";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const SignUpPage = () => {
	const setIsUseHeader = useSetRecoilState(headerState);

	useLayoutEffect(() => {
		setIsUseHeader(true);
	}, []);

	return (
		<div>
			<SignUpContainer />
		</div>
	);
};

export default SignUpPage;
