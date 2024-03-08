import { headerMenuUseState } from "@/states/headerMenuUseState";
import { userRoleState } from "@/states/userRoleState";
import LoginContainer from "@components/login/LoginContainer";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const LoginPage = () => {
	const setIsUseHeader = useSetRecoilState(headerMenuUseState);
	const userRole = useRecoilValue(userRoleState);
	const navigate = useNavigate();

	useLayoutEffect(() => {
		if (userRole !== "anonymous") {
			navigate("/mypage");
		}

		setIsUseHeader({
			isUseHeader: false,
			isUseMenu: false,
			isUseTab: false,
			isUseItemTab: false,
		});
	}, []);

	return (
		<div>
			<LoginContainer />
		</div>
	);
};

export default LoginPage;
