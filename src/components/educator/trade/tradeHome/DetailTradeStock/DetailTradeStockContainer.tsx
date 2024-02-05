import GoBackButton from "@components/common/GoBackButton/GoBackButton";
import DeleteTradeStockModal from "./DeleteTradeStockModal";
import EditButton from "./EditButton";

const DetailTradeStockContainer = () => {
	return (
		<div className="relative mx-auto w-full bg-btn-cancel-tekhelet sm:w-[24.563rem]">
			<GoBackButton />
			<EditButton />
			<DeleteTradeStockModal />
		</div>
	);
};

export default DetailTradeStockContainer;
