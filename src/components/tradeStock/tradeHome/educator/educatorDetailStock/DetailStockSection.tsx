import DeleteStockButton from "./DeleteStockButton";
import DetailStockInfo from "./DetailStockInfo";
import EditButton from "./EditButton";

const DetailStockSection = () => {
	return (
		<div className="h-[calc(100vh-8rem)]">
			<EditButton />
			<DetailStockInfo />
			<DeleteStockButton />
		</div>
	);
};

export default DetailStockSection;
