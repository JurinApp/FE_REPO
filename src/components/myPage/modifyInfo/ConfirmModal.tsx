import { modifyUserinfoModalState } from "@/states/modalState/confirmModalState";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

type TConfirmModalProps = {
	onConfirm: () => void;
};
export const ConfirmModal = ({ onConfirm }: TConfirmModalProps) => {
	const [isOpenModifyUserinfoModal, setIsOpenModifyUserinfoModal] =
		useRecoilState(modifyUserinfoModalState);

	const modalRef = useRef<HTMLDivElement>(null);

	const handleModalClose = () => {
		setIsOpenModifyUserinfoModal(false);
	};

	useEffect(() => {
		const handleOutSideClick = (e: Event) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				setIsOpenModifyUserinfoModal(false);
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
					isOpenModifyUserinfoModal ? "flex" : "hidden"
				} h-full w-full flex-col items-center justify-center bg-black-700`}
			>
				<div ref={modalRef} className="w-[20rem]">
					<div className="bg-opacity-2 flex h-[7.438rem] items-center justify-center bg-white">
						<p className="font-medium text-black">수정하시겠습니까?</p>
					</div>
					<div className="flex h-[3.75rem] flex-row">
						<button className="w-1/2 bg-gray-300" onClick={handleModalClose}>
							취소
						</button>
						<button
							className="w-1/2 bg-tekhelet text-white"
							onClick={onConfirm}
						>
							확인
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
