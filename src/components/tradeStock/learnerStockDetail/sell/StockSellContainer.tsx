import { IStockBSHistory } from "@/interface/stock";
import TradingChart from "../TradingChart";
import StockSellInterface from "./StockSellInterface";

interface IStockSellContainerProps {
	readonly stockBSHistory: IStockBSHistory;
	readonly stockPrice: number;
	readonly userPoint: number;
	readonly stockAmount: number;
	readonly tax: number;
}

const StockSellContainer = ({
	stockBSHistory,
	stockPrice,
	userPoint,
	stockAmount,
	tax,
}: IStockSellContainerProps) => {
	return (
		<>
			<div className="relative mx-auto h-inTrade-height w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				<div className="flex flex-row">
					<TradingChart stockBSHistory={stockBSHistory} />
					<StockSellInterface
						stockPrice={stockPrice}
						userPoint={userPoint}
						stockAmount={stockAmount}
						tax={tax}
					/>
				</div>
			</div>
		</>
	);
};

export default StockSellContainer;
