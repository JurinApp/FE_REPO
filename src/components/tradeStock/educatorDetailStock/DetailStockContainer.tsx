import GoBackButton from "@components/common/GoBackButton/GoBackButton";
import DeleteStockModal from "./DeleteStockModal";
import DetailStockSection from "./DetailStockSection";

const DetailStockContainer = () => {
	return (
		<div className="relative mx-auto w-full bg-btn-cancel-tekhelet sm:w-[24.563rem]">
			<GoBackButton />
			<DetailStockSection />
			<DeleteStockModal />
		</div>
	);
};

export default DetailStockContainer;
