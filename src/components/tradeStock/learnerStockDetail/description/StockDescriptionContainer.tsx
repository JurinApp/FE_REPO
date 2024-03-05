import Spinner from "@/components/common/spinner/Spinner";
import { IStockInfo } from "@/interface/stock";
import StockInfo from "./StockInfo";
import StockPriceChart from "./StockPriceChart";

interface IStockHistory {
	readonly tradeDate: string;
	readonly price: number;
	readonly volume: number;
	readonly transactionAmount: number;
}

interface IStockSpecProps {
	readonly stockInfo: IStockInfo;
	readonly stockPriceHistory: IStockHistory[];
	readonly isLoading: boolean;
}

const StockDescriptionContainer = ({
	stockInfo,
	stockPriceHistory,
	isLoading,
}: IStockSpecProps) => {
	return (
		<>
			<div className="relative mx-auto h-inTrade-height w-full overflow-y-auto bg-btn-cancel-tekhelet py-6">
				{isLoading ? (
					<Spinner />
				) : (
					<>
						<StockInfo stockInfo={stockInfo} />
						<StockPriceChart stockPriceHistory={stockPriceHistory} />
					</>
				)}
			</div>
		</>
	);
};

export default StockDescriptionContainer;
