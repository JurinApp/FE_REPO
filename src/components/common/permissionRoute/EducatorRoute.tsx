import { userRoleState } from "@/states/userRoleState";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

const EducatorRoute = () => {
	const userRole = useRecoilValue(userRoleState);

	useEffect(() => {
		if (userRole !== "teacher") {
			alert("선생님 권한 유저만 접속 가능합니다.");
		}
	}, []);

	return userRole === "teacher" ? <Outlet /> : <Navigate to="/mypage" />;
};

export default EducatorRoute;
