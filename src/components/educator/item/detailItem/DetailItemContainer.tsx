import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import DeleteDetailItemModal from "./DeleteDetailItemModal";
import EditButton from "./EditButton";
import DetailItemInfoSection from "./DetailItemInfoSection";
import { useParams } from "react-router-dom";

const DetailItemContainer = () => {
	const { channelId } = useParams();

	return (
		<div className="relative mx-auto w-full bg-btn-cancel-tekhelet sm:w-[24.563rem]">
			<GoBackButton backNavigationPath={`/${channelId}/item`} />
			<EditButton />
			<DetailItemInfoSection />
			<DeleteDetailItemModal />
		</div>
	);
};

export default DetailItemContainer;
