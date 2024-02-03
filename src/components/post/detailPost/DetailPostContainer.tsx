import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import DeleteDetailPostModal from "./DeleteDetailPostModal";
import DetailPostInfoSection from "./DetailPostInfoSection";

const DetailPostContainer = () => {
	return (
		<div className="relative mx-auto w-full bg-btn-cancel-tekhelet sm:w-[24.563rem]">
			<GoBackButton />
			<DetailPostInfoSection />
			<DeleteDetailPostModal />
		</div>
	);
};

export default DetailPostContainer;
