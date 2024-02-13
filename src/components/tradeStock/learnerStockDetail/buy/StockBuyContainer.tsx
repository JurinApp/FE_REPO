import { IStockBSHistory } from "@/interface/stock";
import TradingChart from "../TradingChart";
import StockBuyInterface from "./StockBuyInterface";

interface IStockBuyContainer {
	readonly stockBSHistory: IStockBSHistory;
	readonly stockPrice: number;
}

const StockBuyContainer = ({
	stockBSHistory,
	stockPrice,
}: IStockBuyContainer) => {
	return (
		<>
			<div className="relative mx-auto h-inTrade-height w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				<div className="flex flex-row">
					<TradingChart stockBSHistory={stockBSHistory} />
					<StockBuyInterface stockPrice={stockPrice} />
				</div>
			</div>
		</>
	);
};

export default StockBuyContainer;
