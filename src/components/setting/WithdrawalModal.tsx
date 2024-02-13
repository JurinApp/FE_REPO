import useAxios from "@/hooks/useAxios";
import { withdrawalModalState } from "@/states/confirmModalState";
import { userRoleState } from "@/states/userRoleState";
import { removeCookie } from "@/utils/cookies";
import { useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

const WithdrawalModal = () => {
	const [isOpenWithdrawalModal, setIsOpenWithdrawalModal] =
		useRecoilState(withdrawalModalState);
	const { axiosData } = useAxios();
	const role = useRecoilValue(userRoleState);
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const resetOpenWithdrwalModal = useResetRecoilState(withdrawalModalState);
	const [password, setPassword] = useState<string>("");
	const [validatePW, setValidatePW] = useState<boolean>(false);
	const [verifiedPW, setVerifiedPW] = useState<boolean>(true);
	const modalRef = useRef<HTMLDivElement>(null);
	const handleModalClose = () => {
		setIsOpenWithdrawalModal(false);
	};

	const validatePasswordFormat = (password: string) => {
		const regex =
			/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}[^\s]*$/;
		const result = regex.test(password);
		setValidatePW(result);
	};
	const debounceValidation = debounce(validatePasswordFormat, 1000);
	// 비밀번호 양식 유효성 검사.

	const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		const password = event.target.value;
		setPassword(password);
		debounceValidation(password);
	};

	const handleResetModal = () => {
		setPassword("");
		setVerifiedPW(true);
		setValidatePW(false);
	};

	useEffect(() => {
		const handleOutSideClick = (e: Event) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				setIsOpenWithdrawalModal(false);
				handleResetModal();
			}
		};
		document.addEventListener("mousedown", handleOutSideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutSideClick);
		};
	}, [modalRef]);

	useEffect(() => {
		return () => {
			resetOpenWithdrwalModal();
		};
	}, []);

	const handleDeleteUser = async () => {
		const apiUrl = `/${role}s/api/v1/users/profile`;
		const response = await axiosData("useToken", {
			method: "DELETE",
			url: apiUrl,
			data: {
				password: password,
			},
		});
		if (response) {
			const status = response.status;
			if (status === 204) {
				removeCookie();
				queryClient.clear();
				navigate("/login");
			}
		}
	};

	return (
		<>
			<div
				className={`fixed left-0 top-0 z-[100] ${
					isOpenWithdrawalModal ? "flex" : "hidden"
				} h-full w-full flex-col items-center justify-center bg-black-700`}
			>
				<div ref={modalRef}>
					<div className="left-0 top-0 flex h-[17.625rem] flex-col bg-[#ffffff]">
						<div className="mx-6 mt-12 flex h-[5.625rem] flex-col items-center justify-between">
							<div className="text-lg">비밀번호를 입력하세요</div>
							<p className="flex items-center justify-center text-center text-sm text-danger">
								회원 탈퇴 시 기존에 있던 상품 및 정보들은
								<br /> 삭제 처리되어 복구가 불가능합니다.
							</p>
						</div>
						<div className="mx-6 mt-12 flex h-12 flex-row">
							<input
								type="password"
								placeholder="비밀번호"
								className={`w-[17.813rem] border-b pb-2 text-center text-base placeholder-gray-300 focus:border-b focus:border-gray-700 focus:outline-none ${
									verifiedPW ? "border-danger" : ""
								}`}
								value={password}
								onChange={handlePassword}
							/>
						</div>
						{!verifiedPW && (
							<p className="mb-[1.875rem] mt-3 text-center text-sm text-danger">
								비밀번호가 틀렸습니다.
							</p>
						)}
					</div>
					<div className="flex h-[3.75rem] flex-row">
						<button className="w-1/2 bg-btn-cancel" onClick={handleModalClose}>
							취소
						</button>
						<button
							className={`w-1/2 text-[#ffffff] ${
								validatePW ? "bg-danger" : "bg-disabled-danger"
							}`}
							onClick={handleDeleteUser}
							disabled={!validatePW}
						>
							확인
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default WithdrawalModal;
