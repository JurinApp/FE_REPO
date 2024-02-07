import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import DeleteDetailItemModal from "./DeleteDetailItemModal";
import EditButton from "./EditButton";
import DetailItemInfoSection from "./DetailItemInfoSection";

const DetailItemContainer = () => {
	return (
		<div className="relative mx-auto w-full bg-btn-cancel-tekhelet sm:w-[24.563rem]">
			<GoBackButton />
			<EditButton />
			<DetailItemInfoSection />
			<DeleteDetailItemModal />
		</div>
	);
};

export default DetailItemContainer;
