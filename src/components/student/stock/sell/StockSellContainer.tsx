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
