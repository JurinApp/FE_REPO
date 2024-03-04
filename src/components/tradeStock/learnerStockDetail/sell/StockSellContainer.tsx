import {
	IStockBSHistory,
	IStockPriceInfo,
	IUserPointInfo,
} from "@/interface/stock";
import MyPoint from "../MyPoint";
import TradingChart from "../TradingChart";
import SellStockForm from "./SellStockForm";

interface ISellStockContainerProps {
	readonly userPointInfo: IUserPointInfo;
	readonly stockPriceInfo: IStockPriceInfo;
	readonly stockBSHistory: IStockBSHistory;
}

const StockSellContainer = ({
	userPointInfo,
	stockPriceInfo,
	stockBSHistory,
}: ISellStockContainerProps) => {
	return (
		<>
			<div className="relative mx-auto h-inTrade-height w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				<div className="flex flex-row">
					<TradingChart stockBSHistory={stockBSHistory} />
					<div className="mx-4 flex w-[14.875rem] flex-col items-center pt-6">
						<MyPoint userPointInfo={userPointInfo} />
						<SellStockForm
							userPointInfo={userPointInfo}
							stockPriceInfo={stockPriceInfo}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default StockSellContainer;
