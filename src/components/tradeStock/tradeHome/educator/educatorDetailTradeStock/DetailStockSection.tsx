import DeleteTradeStockButton from "./DeleteTradeStockButton";
import DetailTradeStockInfo from "./DetailTradeStockInfo";
import EditButton from "./EditButton";

const DetailStockSection = () => {
	return (
		<div className="h-[calc(100vh-8rem)]">
			<EditButton />
			<DetailTradeStockInfo />
			<DeleteTradeStockButton />
		</div>
	);
};

export default DetailStockSection;
