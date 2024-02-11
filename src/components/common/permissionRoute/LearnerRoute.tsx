import { userRoleState } from "@/states/userRoleState";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

const LearnerRoute = () => {
	const userRole = useRecoilValue(userRoleState);

	useEffect(() => {
		if (userRole !== "student") {
			alert("학생 권한 유저만 접속 가능합니다.");
		}
	}, []);

	return userRole === "student" ? <Outlet /> : <Navigate to="/mypage" />;
};

export default LearnerRoute;
