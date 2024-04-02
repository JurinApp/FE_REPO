import GoBackButton from "@components/common/GoBackButton/GoBackButton";
import DeleteStockModal from "./DeleteStockModal";
import DetailStockSection from "./DetailStockSection";
import { useParams } from "react-router-dom";

const DetailStockContainer = () => {
	const { channelId } = useParams();

	return (
		<div className="relative mx-auto w-full bg-btn-cancel-tekhelet sm:w-[24.563rem]">
			<GoBackButton backNavigationPath={`/${channelId}/trade/home`} />
			<DetailStockSection />
			<DeleteStockModal />
		</div>
	);
};

export default DetailStockContainer;
