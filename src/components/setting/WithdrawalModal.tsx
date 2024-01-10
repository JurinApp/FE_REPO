import { TConfirmModalProps } from "@/types/types";
import { debounce } from "lodash";
import { useState } from "react";

const WithdrawalModal = (props: TConfirmModalProps) => {
	const { isOpen, onCancel } = props;
	const [password, setPassword] = useState<string>("");
	const [validatePW, setValidatePW] = useState<boolean>(false);
	const [verifiedPW, setVerifiedPW] = useState<boolean>(true);

	const verifyPassword = () => {
		// TODO: 유효한 코드인지를 확인.(API 호출)
		setTimeout(() => {
			setVerifiedPW(false);
		}, 1000);
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

	if (!isOpen) return null;

	return (
		<>
			<div
				className="fixed left-1/2 top-0 h-[100vh] w-[24.563rem] -translate-x-1/2  transform bg-black-800"
				onClick={onCancel}
			></div>
			<div className="fixed left-1/2 top-1/2 flex h-[21.375rem] w-[333px] -translate-x-1/2 -translate-y-1/2 transform flex-col ">
				<div className="flex h-[17.625rem] flex-col bg-[#ffffff]">
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
					<button className="bg-btn-cancel w-1/2" onClick={onCancel}>
						취소
					</button>
					{validatePW ? (
						<button
							className="w-1/2 bg-danger text-[#ffffff]"
							onClick={verifyPassword}
						>
							확인
						</button>
					) : (
						<button
							className="bg-disabled-danger w-1/2 text-[#ffffff]"
							disabled
						>
							확인
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default WithdrawalModal;
