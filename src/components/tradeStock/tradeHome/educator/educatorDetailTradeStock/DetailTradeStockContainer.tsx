import GoBackButton from "@components/common/GoBackButton/GoBackButton";
import DeleteTradeStockModal from "./DeleteTradeStockModal";
import DetailStockSection from "./DetailStockSection";

const DetailTradeStockContainer = () => {
	return (
		<div className="relative mx-auto w-full bg-btn-cancel-tekhelet sm:w-[24.563rem]">
			<GoBackButton />
			<DetailStockSection />
			<DeleteTradeStockModal />
		</div>
	);
};

export default DetailTradeStockContainer;
