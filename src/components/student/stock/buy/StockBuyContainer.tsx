import { IStockBSHistory } from "@/interface/stock";
import TradingChart from "../common/TradingChart";
import StockBuyInterface from "./StockBuyInterface";

const StockBuyContainer = ({
	stockBuyProps,
	stockPrice,
}: {
	stockBuyProps: IStockBSHistory;
	stockPrice: number;
}) => {
	return (
		<>
			<div className="relative mx-auto h-inTrade-height w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				<div className="flex flex-row">
					<TradingChart stockHistory={stockBuyProps} />
					<StockBuyInterface stockPrice={stockPrice} />
				</div>
			</div>
		</>
	);
};

export default StockBuyContainer;
