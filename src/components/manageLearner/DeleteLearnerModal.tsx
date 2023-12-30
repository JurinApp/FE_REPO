import { deleteConfirmModalState } from "@/states/confirmModalState";
import { selectedLearner } from "@/states/manageLearner";
import { useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

const DeleteLearnerModal = () => {
	const [selectedLearners, setSelectedLearners] =
		useRecoilState(selectedLearner);
	const setIsOpenDeleteModal = useSetRecoilState(deleteConfirmModalState);
	const modalRef = useRef<HTMLDivElement>(null);

	const closeModalHandler = () => {
		setIsOpenDeleteModal(false);
	};

	const deleteBtnHandler = () => {
		setSelectedLearners([]);
		setIsOpenDeleteModal(false);
	};

	useEffect(() => {
		return () => {
			setIsOpenDeleteModal(false);
		};
	}, []);

	return (
		<div className="fixed top-0 z-[100] flex h-full w-full items-center justify-center bg-black-800">
			<div
				ref={modalRef}
				className="flex h-[12rem] w-[333px] flex-col rounded bg-white"
			>
				<div className="flex grow items-center justify-center">
					<p className="my-auto">
						{selectedLearners.length}명을
						<span className="font-medium text-danger"> 삭제</span>
						하시겠습니까?
					</p>
				</div>
				<div className="flex">
					<button
						type="button"
						className="h-[3.75rem] grow rounded-bl bg-btn-cancel-tekhelet text-black-800"
						onClick={closeModalHandler}
					>
						취소
					</button>
					<button
						type="button"
						className="h-[3.75rem] grow rounded-br bg-medium-slate-blue font-bold text-white"
						onClick={deleteBtnHandler}
					>
						확인
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteLearnerModal;
