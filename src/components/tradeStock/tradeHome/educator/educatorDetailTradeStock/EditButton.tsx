import Edit from "@assets/svg/btn_edit.svg?react";
import { Link, useParams } from "react-router-dom";
import DetailTradeStockInfo from "./DetailTradeStockInfo";
import DeleteTradeStockButton from "./DeleteTradeStockButton";

const EditButton = () => {
	const { stockId } = useParams();

	return (
		<div className="h-[calc(100vh-8rem)]">
			<Link
				to={`/trade/stock/edit/${stockId}`}
				className="my-1 flex flex-row-reverse px-4 sm:my-[0.875rem]"
			>
				<Edit />
			</Link>
			<DetailTradeStockInfo />
			<DeleteTradeStockButton />
		</div>
	);
};

export default EditButton;
