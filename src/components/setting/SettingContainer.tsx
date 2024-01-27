import { useState } from "react";
import WithdrawalModal from "./WithdrawalModal";

const SettingContainer = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handleWithdrawal = () => {
		// TODO 회원 탈퇴 기능 구현
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="mx-auto h-[50.312rem] bg-[#ffffff] bg-opacity-5 sm:w-[23.563rem]">
			<div className="mx-4 flex h-[50.312rem] flex-col justify-between text-base">
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
					<section
						id="team-info"
						className="mt-[1.875rem] flex h-[8.5rem] flex-col"
					>
						<h2 className="mb-[0.875rem] font-bold">팀 정보</h2>
						<div className="h-[6.375rem] rounded border border-black-100 bg-black-100"></div>
					</section>
					<section
						id="etc"
						className="mt-[1.875rem] flex h-[11.75rem] flex-col"
					>
						<h2 className="mb-[0.875rem] font-bold ">기타</h2>
						<ul className="flex h-[9.625rem] flex-col justify-between gap-2">
							<li className="flex h-[2.875rem] items-center rounded border border-black-100 py-[0.875rem] pl-[0.875rem] text-sm text-black-800">
								FAQ
							</li>
							<li className="flex h-[2.875rem] items-center rounded border border-black-100 py-[0.875rem] pl-[0.875rem] text-sm text-black-800">
								약관
							</li>
							<li className="flex h-[2.875rem] items-center rounded border border-black-100 py-[0.875rem] pl-[0.875rem] text-sm text-black-800">
								개인정보 처리 방침
							</li>
						</ul>
					</section>
				</div>
				<div>
					<button
						className="mb-4 mt-[10.063rem] flex h-[3.188rem] w-[361px] items-center justify-center rounded border border-danger bg-[#ffffff] font-bold text-danger"
						onClick={() => setIsModalOpen(true)}
					>
						회원 탈퇴
					</button>
					<button className="mb-8 flex h-[3.188rem] w-[361px] items-center justify-center rounded bg-[#3d348b] font-bold text-white">
						로그아웃
					</button>
				</div>
			</div>
			{isModalOpen && (
				<WithdrawalModal
					isOpen={isModalOpen}
					onCancel={handleCancel}
					onConfirm={handleWithdrawal}
				/>
			)}
		</div>
	);
};

export default SettingContainer;
