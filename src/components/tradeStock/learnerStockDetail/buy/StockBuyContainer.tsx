import { IStockBSHistory } from "@/interface/stock";
import TradingChart from "../TradingChart";
import StockBuyInterface from "./StockBuyInterface";

interface IStockBuyContainer {
	readonly stockBSHistory: IStockBSHistory;
	readonly stockPrice: number;
	readonly userPoint: number;
	readonly stockAmount: number;
}

const StockBuyContainer = ({
	stockBSHistory,
	stockPrice,
	userPoint,
	stockAmount,
}: IStockBuyContainer) => {
	return (
		<>
			<div className="relative mx-auto h-inTrade-height w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				<div className="flex flex-row">
					<TradingChart stockBSHistory={stockBSHistory} />
					<StockBuyInterface
						stockPrice={stockPrice}
						userPoint={userPoint}
						stockAmount={stockAmount}
					/>
				</div>
			</div>
		</>
	);
};

export default StockBuyContainer;
