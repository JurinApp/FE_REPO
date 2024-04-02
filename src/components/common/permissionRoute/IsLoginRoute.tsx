import { userRoleState } from "@/states/userRoleState";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

const IsLoginRoute = () => {
	const userRole = useRecoilValue(userRoleState);

	useEffect(() => {
		if (userRole === "anonymous") {
			alert("로그인한 유저만 접속 가능합니다.");
		}
	}, []);

	return userRole === "anonymous" ? <Navigate to="/login" /> : <Outlet />;
};

export default IsLoginRoute;
