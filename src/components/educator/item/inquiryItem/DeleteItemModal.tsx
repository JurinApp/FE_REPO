import Spinner from "@/components/common/spinner/Spinner";
import useDeleteItems from "@/hooks/mutations/item/useDeleteItems";
import { deleteItemsModalState } from "@/states/modalState/confirmModalState";
import { selectedItemState } from "@/states/selectedState/selectedItemState";
import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

const DeleteItemModal = () => {
	const selectedItems = useRecoilValue(selectedItemState);
	const [isOpenModal, setIsOpenModal] = useRecoilState(deleteItemsModalState);
	const resetIsOpenModal = useResetRecoilState(deleteItemsModalState);
	const modalRef = useRef<HTMLDivElement>(null);
	const { mutate, isPending } = useDeleteItems();

	const handleClickCancelBtn = () => {
		setIsOpenModal(false);
	};

	const handleClickDeleteBtn = () => {
		mutate();
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
		<>
			{isPending ? (
				<Spinner />
			) : (
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
							<p className="my-auto">
								{selectedItems.length}개를
								<span className="font-medium text-danger"> 삭제</span>
								하시겠습니까?
							</p>
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
								onClick={handleClickDeleteBtn}
							>
								확인
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default DeleteItemModal;
