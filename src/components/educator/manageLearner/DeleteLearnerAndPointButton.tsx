import {
	deleteConfirmModalState,
	paymentPointModalState,
} from "@/states/modalState/confirmModalState";
import { selectedLearner } from "@/states/selectedState/selectedLearnerState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import PointIcon from "@assets/svg/pointIcon.svg?react";

const DeleteLearnerButton = () => {
	const selectedLearners = useRecoilValue(selectedLearner);
	const setIsOpenDeleteLearnerModal = useSetRecoilState(
		deleteConfirmModalState,
	);
	const setIsOpenPaymentPoint = useSetRecoilState(paymentPointModalState);
	const isExistSelectedLearners = selectedLearners.length !== 0;

	const handleClickDeleteLearners = () => {
		setIsOpenDeleteLearnerModal(true);
	};

	const handlePaymentPoint = () => {
		setIsOpenPaymentPoint(true);
	};

	return (
		<div className="absolute bottom-6 left-0 flex w-full px-4">
			<button
				type="button"
				disabled={!isExistSelectedLearners}
				className="mr-2 h-box-height w-full rounded border border-danger bg-white font-bold text-danger disabled:border-black-300 disabled:bg-black-100 disabled:text-black-300"
				onClick={handleClickDeleteLearners}
			>
				삭제
			</button>
			<button
				type="button"
				disabled={!isExistSelectedLearners}
				className="flex h-box-height w-full items-center justify-center rounded bg-tekhelet font-bold text-white disabled:border disabled:border-black-300 disabled:bg-black-100 disabled:text-black-300"
				onClick={handlePaymentPoint}
			>
				<div className="mr-[0.375rem] flex h-6 w-6 items-center justify-center rounded-full bg-tangerine">
					<PointIcon className="h-3 w-[0.563rem]" />
				</div>
				포인트 지급
			</button>
		</div>
	);
};

export default DeleteLearnerButton;
