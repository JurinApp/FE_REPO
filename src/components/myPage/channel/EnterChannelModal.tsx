import useEnterChannel from "@/hooks/mutations/myPage/useEnterChannel";
import { enterChannelModalState } from "@/states/modalState/confirmModalState";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

export interface IIsError {
	readonly error: boolean;
	readonly errorMsg: string;
}

export const EnterChannelModal = () => {
	const [isEnterChannelModalOpen, setIsEnterChannelModalOpen] = useRecoilState(
		enterChannelModalState,
	);
	const [code, setCode] = useState<string>("");
	const [isError, setIsError] = useState<IIsError>({
		error: true,
		errorMsg: "",
	});
	const modalRef = useRef<HTMLFormElement>(null);
	const { mutate } = useEnterChannel(setIsError);

	const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
		setCode(e.target.value);
	};

	const handleCloseModal = () => {
		setIsEnterChannelModalOpen(false);
	};

	const handleEnterChannel = (e: FormEvent) => {
		e.preventDefault();
		const entryCode = code;
		mutate(entryCode);
	};

	useEffect(() => {
		if (code.length < 6) {
			setIsError({
				error: true,
				errorMsg: "코드를 입력해주세요",
			});
		}

		if (code.length >= 6 && isError.error) {
			setIsError({
				error: false,
				errorMsg: "",
			});
		}
	}, [code]);

	useEffect(() => {
		const handleOutSideClick = (e: Event) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				setCode("");
				setIsEnterChannelModalOpen(false);
			}
		};
		document.addEventListener("mousedown", handleOutSideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutSideClick);
		};
	}, [modalRef]);

	return (
		<div
			className={`fixed left-0 top-0 z-[100] ${
				isEnterChannelModalOpen ? "flex" : "hidden"
			} h-full w-full flex-col items-center justify-center bg-black-700`}
		>
			<form onSubmit={handleEnterChannel} ref={modalRef} className="w-[20rem]">
				<div className="left-0 top-0 flex h-[13.75rem] flex-col items-center justify-center bg-white">
					<p className="mb-4 text-lg font-medium text-black">
						채널 코드를 입력하세요.
					</p>
					{isError.error && (
						<p className="mb-4 text-sm text-danger">{isError.errorMsg}</p>
					)}
					<input
						type="text"
						id="channel-code"
						name="channel-code"
						value={code}
						onChange={handleChangeCode}
						className={`border-b pb-2 text-base placeholder-gray-300 outline-none ${
							isError.error ? "border-danger" : "focus:border-gray-700 "
						}`}
					/>
				</div>
				<div className="flex h-[3.75rem] flex-row">
					<button
						type="button"
						className="w-1/2 bg-btn-cancel text-black"
						onClick={handleCloseModal}
					>
						취소
					</button>
					<button
						type="submit"
						className={`w-1/2 text-white ${
							code.length >= 6 ? "bg-iris" : "bg-disabled-tekhelet"
						}`}
						disabled={!(code.length >= 6)}
						onClick={handleEnterChannel}
					>
						입장
					</button>
				</div>
			</form>
		</div>
	);
};
