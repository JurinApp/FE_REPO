import { withdrawalModalState } from "@/states/modalState/confirmModalState";
import { userRoleState } from "@/states/userRoleState";
import { removeCookie } from "@/utils/cookies";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";

const SettingSection = () => {
	const setIsWithdrawalModalOpen = useSetRecoilState(withdrawalModalState);
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const setUserRole = useSetRecoilState(userRoleState);

	const handleWithdrawalModalOpen = () => {
		setIsWithdrawalModalOpen(true);
	};

	const handleSignOut = async () => {
		queryClient.clear();
		setUserRole("anonymous");
		removeCookie();
		navigate("/login");
	};

	return (
		<div className="mx-4 flex h-[calc(100vh-6rem)] flex-col justify-between text-base">
			<div>
				<section
					id="app-version"
					className="mt-6 flex h-[4.313rem] flex-col justify-between"
				>
					<h2 className="h-1/2 font-bold">앱 정보</h2>
					<div className="flex h-1/2 flex-row items-end justify-between border-t border-black-100">
						<p>2.06 ver</p>
						<p className="text-sm text-tekhelet">최신 버전입니다.</p>
					</div>
				</section>
				<section id="etc" className="mt-[1.875rem] flex h-[11.75rem] flex-col">
					<h2 className="mb-[0.875rem] font-bold ">기타</h2>
					<ul className="flex h-[9.625rem] flex-col justify-between gap-2">
						<Link to={"/manual"}>
							<li className="flex h-[2.875rem] items-center rounded border border-black-100 py-[0.875rem] pl-[0.875rem] text-sm text-black-800">
								도움말
							</li>
						</Link>
					</ul>
				</section>
			</div>
			<div>
				<button
					className="mb-4 flex h-[3.188rem] w-full items-center justify-center rounded border border-danger bg-[#ffffff] font-bold text-danger"
					onClick={handleWithdrawalModalOpen}
				>
					회원 탈퇴
				</button>
				<button
					onClick={handleSignOut}
					className="mb-8 flex h-[3.188rem] w-full items-center justify-center rounded bg-tekhelet font-bold text-white"
				>
					로그아웃
				</button>
			</div>
		</div>
	);
};

export default SettingSection;
