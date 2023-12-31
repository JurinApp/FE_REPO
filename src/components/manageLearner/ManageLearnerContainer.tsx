import {
	deleteConfirmModalState,
	paymentPointModalState,
} from "@/states/confirmModalState";
import { useRecoilValue } from "recoil";
import DeleteLearnerButton from "./DeleteLearnerButton";
import DeleteLearnerModal from "./DeleteLearnerModal";
import LearnerList from "./LearnerList";
import LearnerSearch from "./LearnerSearch";
import ManageLearnerHeadingTitle from "./ManageLearnerHeadingTitle";
import PaymentPointModal from "./PaymentPointModal";

const ManageLearnerContainer = () => {
	const isOpenDeleteLearnerModal = useRecoilValue(deleteConfirmModalState);
	const isOpenPaymentPointModal = useRecoilValue(paymentPointModalState);

	return (
		<div>
			<div className="relative mx-auto h-body-height w-full bg-btn-cancel-tekhelet px-4 pt-6 sm:w-[24.563rem]">
				<ManageLearnerHeadingTitle />
				<LearnerSearch />
				<LearnerList />
				<DeleteLearnerButton />
			</div>
			{isOpenDeleteLearnerModal && <DeleteLearnerModal />}
			{isOpenPaymentPointModal && <PaymentPointModal />}
		</div>
	);
};

export default ManageLearnerContainer;
