import useAxios from "@/hooks/useAxios";
import { withdrawalModalState } from "@/states/modalState/confirmModalState";
import { userRoleState } from "@/states/userRoleState";
import { removeCookie } from "@/utils/cookies";
import { useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

const WithdrawalModal = () => {
	const role = useRecoilValue(userRoleState);
	const [isOpenWithdrawalModal, setIsOpenWithdrawalModal] =
		useRecoilState(withdrawalModalState);
	const resetOpenWithdrawalModal = useResetRecoilState(withdrawalModalState);
	const navigate = useNavigate();
	const { axiosData } = useAxios();
	const queryClient = useQueryClient();
	const modalRef = useRef<HTMLFormElement>(null);

	const [password, setPassword] = useState<string>("");
	const [validatePW, setValidatePW] = useState<boolean>(false);
	const [verifiedPW, setVerifiedPW] = useState<boolean>(true);

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

	const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
		const password = event.target.value;
		setPassword(password);
		debounceValidation(password);
	};

	const handleResetModal = () => {
		setPassword("");
		setVerifiedPW(true);
		setValidatePW(false);
	};

	const handleDeleteUser = async (e: FormEvent) => {
		e.preventDefault();

		const response = await axiosData("useToken", {
			method: "DELETE",
			url: `/${role}s/api/v1/users/profile`,
			data: {
				password: password,
			},
		});
		if (response) {
			const status = response.status;
			if (status === 204) {
				alert("회원 탈퇴가 완료되었습니다.");
				removeCookie();
				queryClient.clear();
				navigate("/login");
			} else {
				alert("비밀번호를 확인해주세요.");
			}
		} else {
			alert("회원탈퇴가 되지 않았습니다. 잠시 후에 다시 시도해주세요");
		}
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
			resetOpenWithdrawalModal();
		};
	}, []);

	return (
		<>
			<div
				className={`fixed left-0 top-0 z-[100] ${
					isOpenWithdrawalModal ? "flex" : "hidden"
				} h-full w-full flex-col items-center justify-center bg-black-700`}
			>
				<form onSubmit={handleDeleteUser} ref={modalRef}>
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
									verifiedPW && "border-danger"
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
						<button
							type="button"
							className="w-1/2 bg-btn-cancel"
							onClick={handleModalClose}
						>
							취소
						</button>
						<button
							type="submit"
							className={`w-1/2 text-white ${
								validatePW ? "bg-danger" : "bg-gray-500"
							}`}
							disabled={!validatePW}
						>
							확인
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default WithdrawalModal;
