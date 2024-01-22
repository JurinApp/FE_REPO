import { deleteDetailTradeStockModalState } from "@/states/confirmModalState";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

const DeleteTradeStockModal = () => {
	const [
		isOpenDeleteDetailTradeStockModal,
		setIsOpenDeleteDetailTradeStockModal,
	] = useRecoilState(deleteDetailTradeStockModalState);
	const modalRef = useRef<HTMLDivElement>(null);

	const cancelHandler = () => {
		setIsOpenDeleteDetailTradeStockModal(false);
	};

	const deleteDetailTradeStockHandler = () => {
		setIsOpenDeleteDetailTradeStockModal(false);
	};

	useEffect(() => {
		const outSideClickHandler = (e: Event) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				setIsOpenDeleteDetailTradeStockModal(false);
			}
		};

		document.addEventListener("mousedown", outSideClickHandler);

		return () => {
			document.removeEventListener("mousedown", outSideClickHandler);
		};
	}, [modalRef]);

	useEffect(() => {
		return () => {
			if (isOpenDeleteDetailTradeStockModal) {
				setIsOpenDeleteDetailTradeStockModal(false);
			}
		};
	}, []);

	return (
		<div className="fixed left-0 top-0 z-[100] flex h-full w-full items-center justify-center bg-black-800">
			<div
				ref={modalRef}
				className="flex h-[12rem] w-modal-width flex-col rounded bg-white"
			>
				<div className="flex grow items-center justify-center">
					<p className="my-auto">
						주식거래 상품을
						<span className="font-medium text-danger"> 삭제</span>
						하시겠습니까?
					</p>
				</div>
				<div className="flex">
					<button
						type="button"
						className="h-[3.75rem] grow rounded-bl bg-btn-cancel-tekhelet text-black-800"
						onClick={cancelHandler}
					>
						취소
					</button>
					<button
						type="button"
						className="h-[3.75rem] grow rounded-br bg-medium-slate-blue font-bold text-white"
						onClick={deleteDetailTradeStockHandler}
					>
						확인
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteTradeStockModal;
