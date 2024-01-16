import SuccessSignUp from "@/components/signUp/SuccessSignUp";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const SuccessSignUpPage = () => {
	const setIsUseHeader = useSetRecoilState(headerMenuUseState);

	useLayoutEffect(() => {
		setIsUseHeader({
			isUseHeader: true,
			isUseMenu: false,
			isUseTab: false,
		});
	}, []);

	return (
		<>
			<SuccessSignUp />
		</>
	);
};
export default SuccessSignUpPage;
