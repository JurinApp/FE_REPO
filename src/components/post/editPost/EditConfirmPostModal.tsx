import { editPostModalState } from "@/states/modalState/confirmModalState";
import {
	cancelLockBodyScroll,
	lockBodyScroll,
} from "@/utils/controlBodyScroll";
import { useEffect, useRef } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

interface IEditConfirmModalProps {
	readonly setIsEdit: (isEdit: boolean) => void;
}

const EditConfirmModal = ({ setIsEdit }: IEditConfirmModalProps) => {
	const [isOpenModal, setIsOpenModal] = useRecoilState(editPostModalState);
	const resetIsOpenModal = useResetRecoilState(editPostModalState);
	const modalRef = useRef<HTMLDivElement>(null);

	const handleClickCancelBtn = () => {
		setIsOpenModal(false);
	};

	const handleClickEditBtn = () => {
		setIsEdit(true);
		setIsOpenModal(false);
	};

	useEffect(() => {
		const handleOutSideClick = (e: Event) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				setIsOpenModal(false);
			}
		};

		document.addEventListener("mousedown", handleOutSideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutSideClick);
		};
	}, [modalRef]);

	useEffect(() => {
		isOpenModal ? lockBodyScroll() : cancelLockBodyScroll();

		return () => {
			if (isOpenModal) {
				resetIsOpenModal();
			}
		};
	}, [isOpenModal]);

	return (
		<div
			className={`${
				isOpenModal ? "fixed" : "hidden"
			} left-0 top-0 z-[100] flex h-full w-full items-center justify-center bg-black-800`}
		>
			<div
				ref={modalRef}
				className="flex h-[12rem] w-modal-width flex-col rounded bg-white"
			>
				<div className="flex grow items-center justify-center">
					<p className="my-auto">수정하시겠습니까?</p>
				</div>
				<div className="flex">
					<button
						type="button"
						className="h-[3.75rem] grow rounded-bl bg-btn-cancel-tekhelet text-black-800"
						onClick={handleClickCancelBtn}
					>
						취소
					</button>
					<button
						type="button"
						className="h-[3.75rem] grow rounded-br bg-medium-slate-blue font-bold text-white"
						onClick={handleClickEditBtn}
					>
						확인
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditConfirmModal;
