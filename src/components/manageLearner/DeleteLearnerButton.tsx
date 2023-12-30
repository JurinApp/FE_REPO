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
		<button
			type="button"
			className={`sticky bottom-0 h-box-height w-box-width rounded border font-bold ${
				isExistSelectedLearners
					? "border-danger bg-white text-danger"
					: "border-black-300 bg-black-100 text-black-300"
			}`}
			onClick={onClickDeleteBtnHandler}
		>
			삭제
		</button>
	);
};

export default DeleteLearnerButton;
