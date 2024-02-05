import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import DeleteDetailItemModal from "./DeleteDetailItemModal";
import EditButton from "./EditButton";

const DetailItemContainer = () => {
	return (
		<div className="relative mx-auto w-full bg-btn-cancel-tekhelet sm:w-[24.563rem]">
			<GoBackButton />
			<EditButton />
			<DeleteDetailItemModal />
		</div>
	);
};

export default DetailItemContainer;
