import DeleteLearnerButton from "./DeleteLearnerAndPointButton";
import LearnerList from "./LearnerList";
import LearnerSearch from "./LearnerSearch";
import ManageLearnerHeadingTitle from "./ManageLearnerHeadingTitle";
import DeleteLearnerModal from "./modal/DeleteLearnerModal";
import PaymentPointModal from "./modal/PaymentPointModal";

const learnerArr = [
	{ learnerId: "1", learnerName: "공덕현" },
	{ learnerId: "2", learnerName: "김종진" },
	{ learnerId: "3", learnerName: "사재혁" },
	{ learnerId: "4", learnerName: "이수정" },
	{ learnerId: "5", learnerName: "이형규" },
	{ learnerId: "6", learnerName: "조성주" },
];

const ManageLearnerContainer = () => {
	return (
		<div className="relative mx-auto h-body-height w-full bg-btn-cancel-tekhelet px-4 sm:w-[24.563rem]">
			<ManageLearnerHeadingTitle learnerList={learnerArr} />
			<LearnerSearch />
			<LearnerList learnerList={learnerArr} />
			<DeleteLearnerButton />
			<DeleteLearnerModal />
			<PaymentPointModal />
		</div>
	);
};

export default ManageLearnerContainer;
