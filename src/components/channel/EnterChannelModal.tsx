import { enterChannelModalState } from "@/states/confirmModalState";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

export const EnterChannelModal = () => {
	const [isEnterChannelModalOpen, setIsEnterChannelModalOpen] = useRecoilState(
		enterChannelModalState,
	);
	const [code, setCode] = useState<string>("");
	const [validateCode, setValidateCode] = useState<boolean>(false);
	const [verifiedCode, setVerifiedCode] = useState<boolean>(true);
	const modalRef = useRef<HTMLDivElement>(null);

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
	// setVerifiedCode(true);
	// };

	const handleCode = (event: React.ChangeEvent<HTMLInputElement>) => {
		const code = event.target.value;
		setCode(code);
		debounceValidation(code);
	};

	const handleResetModal = () => {
		setCode("");
		setValidateCode(false);
		setVerifiedCode(true);
	};

	const handleModalClose = () => {
		setIsEnterChannelModalOpen(false);
	};

	useEffect(() => {
		const handleOutSideClick = (e: Event) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				setIsEnterChannelModalOpen(false);
				handleResetModal();
			}
		};
		document.addEventListener("mousedown", handleOutSideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutSideClick);
		};
	}, [modalRef]);

	return (
		<>
			<div
				className={`fixed left-0 top-0 z-[100] ${
					isEnterChannelModalOpen ? "flex" : "hidden"
				} h-full w-full flex-col items-center justify-center bg-black-700`}
			>
				<div ref={modalRef} className="w-[20rem]">
					<div className="left-0 top-0 flex h-[13.75rem] flex-col items-center justify-center bg-[#ffffff]">
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
						<button
							className="w-1/2 bg-btn-cancel text-black"
							onClick={handleModalClose}
						>
							취소
						</button>
						{validateCode ? (
							<button className="w-1/2 bg-iris text-[#ffffff]">입장</button>
						) : (
							<button
								className="w-1/2 bg-disabled-tekhelet  text-[#ffffff]"
								disabled
							>
								입장
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
