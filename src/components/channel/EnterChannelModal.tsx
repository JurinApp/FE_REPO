import { debounce } from "lodash";
import { useState } from "react";

type TEnterChannelModalProps = {
	isOpen: boolean;
	onConfirm: () => void;
	onCancel: () => void;
};
export const EnterChannelModal = (props: TEnterChannelModalProps) => {
	const { isOpen, onCancel } = props;
	const [code, setCode] = useState<string>("");
	const [validateCode, setValidateCode] = useState<boolean>(false);
	const [verifiedCode, setVerifiedCode] = useState<boolean>(false);
	// 코드 양식 유효성 검증 함수
	const validateCodeFormat = (code: string) => {
		const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/;
		const result = regex.test(code);
		setValidateCode(result);
	};
	const debounceValidation = debounce(validateCodeFormat, 1000);
	// 코드 유효성 검증 함수
	// const verifyCode = () => {
	// TODO: DB에 존재하는 채널 코드 확인 API 추가 예정.
	setVerifiedCode(true);
	// };

	const handleCode = (event: React.ChangeEvent<HTMLInputElement>) => {
		const code = event.target.value;
		setCode(code);
		debounceValidation(code);
	};

	if (!isOpen) return null;

	return (
		<>
			<div
				className="fixed left-1/2 top-0 h-[100vh] w-[24.563rem] -translate-x-1/2  transform bg-black-800"
				onClick={onCancel}
			></div>
			<div className="fixed left-1/2 top-1/2 flex h-[17.5rem] w-[333px] -translate-x-1/2 -translate-y-2/3 transform flex-col">
				<div className="bg-opacity-2 flex h-[13.75rem] flex-col items-center justify-center bg-[#ffffff]">
					<p className="text-lg font-medium text-[#000000]">
						채널 코드를 입력하세요.
					</p>
					{!verifiedCode ? (
						<p className="my-[0.938rem] text-sm text-danger">
							유효하지 않은 코드입니다.
						</p>
					) : (
						<div className="h-12 "></div>
					)}
					<label htmlFor="channel-code"></label>
					<input
						type="text"
						id="channel-code"
						name="channel-code"
						value={code}
						onChange={handleCode}
						className={`border-b pb-2 text-base placeholder-gray-300 focus:border-b focus:border-gray-700 focus:outline-none ${
							!verifiedCode ? "border-danger" : ""
						}`}
					/>
				</div>
				<div className="flex h-[3.75rem] flex-row">
					{validateCode ? (
						<button className="w-full bg-[#3d348b] text-[#ffffff]">입장</button>
					) : (
						<button
							className="w-full bg-disabled-tekhelet  text-[#ffffff]"
							disabled
						>
							입장
						</button>
					)}
				</div>
			</div>
		</>
	);
};
