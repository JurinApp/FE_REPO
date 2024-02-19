import { useRecoilState, useResetRecoilState } from "recoil";
import { useRef, useEffect } from "react";
import { editTradeStockModalState } from "@/states/modalState/confirmModalState";

interface IEditConfirmTradeStockModalProps {
	readonly setIsEdit: (isEdit: boolean) => void;
}

const EditConfirmStockModal = ({
	setIsEdit,
}: IEditConfirmTradeStockModalProps) => {
	const [isOpenModal, setIsOpenModal] = useRecoilState(
		editTradeStockModalState,
	);
	const resetIsOpenModal = useResetRecoilState(editTradeStockModalState);
	const modalRef = useRef<HTMLDivElement>(null);

	const handleCancel = () => {
		setIsOpenModal(false);
	};

	const handleEdit = () => {
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
		return () => {
			if (isOpenModal) {
				resetIsOpenModal();
			}
		};
	}, []);

	return (
		<div
			className={`${
				isOpenModal ? "flex items-center justify-center" : "hidden"
			} fixed left-0 top-0 z-[100] h-full w-full bg-black-800`}
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
						onClick={handleCancel}
					>
						취소
					</button>
					<button
						type="button"
						className="h-[3.75rem] grow rounded-br bg-medium-slate-blue font-bold text-white"
						onClick={handleEdit}
					>
						확인
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditConfirmStockModal;
