import {
	deleteConfirmModalState,
	paymentPointModalState,
} from "@/states/confirmModalState";
import { selectedLearner } from "@/states/manageLearner";
import { useRecoilValue, useSetRecoilState } from "recoil";
import PointIcon from "@assets/svg/pointIcon.svg?react";

const DeleteLearnerButton = () => {
	const setIsOpenDeleteLearnerModal = useSetRecoilState(
		deleteConfirmModalState,
	);
	const selectedLearners = useRecoilValue(selectedLearner);
	const setIsOpenPaymentPoint = useSetRecoilState(paymentPointModalState);
	const isExistSelectedLearners = selectedLearners.length !== 0;

	const onClickDeleteBtnHandler = () => {
		setIsOpenDeleteLearnerModal(true);
	};

	const openPaymentPointModalHandler = () => {
		setIsOpenPaymentPoint(true);
	};

	return (
		<div className="absolute bottom-6 left-0 flex w-full px-4">
			<button
				type="button"
				disabled={!isExistSelectedLearners}
				className="mr-2 h-box-height w-full rounded border border-danger bg-white font-bold text-danger disabled:border-black-300 disabled:bg-black-100 disabled:text-black-300"
				onClick={onClickDeleteBtnHandler}
			>
				삭제
			</button>
			<button
				type="button"
				disabled={!isExistSelectedLearners}
				className="flex h-box-height w-full items-center justify-center rounded bg-tekhelet font-bold text-white disabled:border disabled:border-black-300 disabled:bg-black-100 disabled:text-black-300"
				onClick={openPaymentPointModalHandler}
			>
				<div className="mr-[0.375rem] flex h-6 w-6 items-center justify-center rounded-full bg-tangerine">
					<PointIcon width={9} height={12} />
				</div>
				포인트 지급
			</button>
		</div>
	);
};

export default DeleteLearnerButton;
