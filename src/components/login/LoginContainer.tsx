import { useEffect } from "react";
import LoginFormSection from "./LoginFormSection";
import LogoSection from "./LogoSection";
import { getCookie } from "@/utils/cookies";
import { decodeToken } from "@/utils/decodeToken";
import { useSetRecoilState } from "recoil";
import { userRoleState } from "@/states/userRoleState";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const setUserRole = useSetRecoilState(userRoleState);

	const handleCheckLogin = () => {
		const token = getCookie("accessToken");
		if (token) {
			const role = decodeToken(token);
			setUserRole(role);
			navigate("/mypage");
		}
	};

	useEffect(() => {
		handleCheckLogin();
	}, []);

	return (
		<>
			<LogoSection />
			<LoginFormSection />
		</>
	);
};

export default Login;
