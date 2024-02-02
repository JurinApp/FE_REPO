import { IStockBSHistory } from "@/interface/stock";
import { useState } from "react";
import TradingChart from "../common/TradingChart";
import StockSellInterface from "./StockSellInterface";

const StockSellContainer = ({
	stockSellProps,
	stockPrice,
}: {
	stockSellProps: IStockBSHistory;
	stockPrice: number;
}) => {
	const [stockCount, setStockCount] = useState(1);

	const increaseStockCount = () => {
		setStockCount(stockCount + 1);
	};

	const decreaseStockCount = () => {
		if (stockCount > 0) {
			setStockCount(stockCount - 1);
		}
	};

	const sellStock = () => {
		// TODO: 주식 판매 API
		console.log("판매완료");
	};
	return (
		<>
			<div className="relative mx-auto h-inTrade-height w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				<div className="flex flex-row">
					<TradingChart stockHistory={stockSellProps} />
					<StockSellInterface stockPrice={stockPrice} />
				</div>
			</div>
		</>
	);
};

export default StockSellContainer;
