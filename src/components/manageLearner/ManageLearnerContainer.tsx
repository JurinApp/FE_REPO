import LearnerList from "./LearnerList";
import LearnerSearch from "./LearnerSearch";
import ManageLearnerHeadingTitle from "./ManageLearnerHeadingTitle";

// <button
// 	type="button"
// 	className="sm:w-box-height h-box-height sm:w-box-width fixed bottom-[4.188rem] w-full rounded border border-danger bg-white font-bold text-danger"
// >
// 	삭제
// </button>
const ManageLearnerContainer = () => {
	return (
		<div className="relative mx-auto h-body-height w-full bg-btn-cancel-tekhelet px-4 pt-6 sm:w-[24.563rem]">
			<ManageLearnerHeadingTitle />
			<LearnerSearch />
			<LearnerList />
			<button
				type="button"
				className="sticky bottom-0 h-box-height w-box-width rounded border border-danger bg-white font-bold text-danger"
			>
				삭제
			</button>
		</div>
	);
};

export default ManageLearnerContainer;
