import { deleteConfirmModalState } from "@/states/confirmModalState";
import { selectedLearner } from "@/states/manageLearner";
import { useRecoilValue, useSetRecoilState } from "recoil";

const DeleteLearnerButton = () => {
	const setIsOpenDeleteLearnerModal = useSetRecoilState(
		deleteConfirmModalState,
	);
	const selectedLearners = useRecoilValue(selectedLearner);
	const isExistSelectedLearners = selectedLearners.length !== 0;

	const onClickDeleteBtnHandler = () => {
		setIsOpenDeleteLearnerModal(true);
	};

	return (
		<div className="absolute bottom-6 left-0 flex w-full px-4">
			<button
				type="button"
				disabled={!isExistSelectedLearners}
				className="h-box-height w-full rounded border border-danger bg-white font-bold text-danger disabled:border-black-300 disabled:bg-black-100 disabled:text-black-300 sm:w-item-width"
				onClick={onClickDeleteBtnHandler}
			>
				삭제
			</button>
		</div>
	);
};

export default DeleteLearnerButton;
