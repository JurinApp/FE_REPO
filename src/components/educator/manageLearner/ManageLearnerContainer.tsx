import Spinner from "@/components/common/spinner/Spinner";
import useLearnerList from "@/hooks/queries/manageLearner/useLearnerList";
import DeleteLearnerButton from "./DeleteLearnerAndPointButton";
import LearnerList from "./LearnerList";
import LearnerSearch from "./LearnerSearch";
import ManageLearnerHeadingTitle from "./ManageLearnerHeadingTitle";
import DeleteLearnerModal from "./modal/DeleteLearnerModal";
import PaymentPointModal from "./modal/PaymentPointModal";

const ManageLearnerContainer = () => {
	const { data, isLoading } = useLearnerList();

	return (
		<div className="relative mx-auto h-body-height w-full bg-btn-cancel-tekhelet px-4 sm:w-[24.563rem]">
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<ManageLearnerHeadingTitle learnerList={data} />
					<LearnerSearch />
					<LearnerList learnerList={data} />
					<DeleteLearnerButton />
					<DeleteLearnerModal />
					<PaymentPointModal />
				</>
			)}
		</div>
	);
};

export default ManageLearnerContainer;
