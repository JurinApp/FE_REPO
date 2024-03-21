import {
	IStockBSHistory,
	IStockPriceInfo,
	IUserPointInfo,
} from "@/interface/stock";
import MyPoint from "../MyPoint";
import TradingChart from "../tradingChart/TradingChart";
import SellStockForm from "./SellStockForm";

interface ISellStockContainerProps {
	readonly userPointInfo: IUserPointInfo;
	readonly stockPriceInfo: IStockPriceInfo;
	readonly stockBSHistory: IStockBSHistory;
}

const SellStockContainer = ({
	userPointInfo,
	stockPriceInfo,
	stockBSHistory,
}: ISellStockContainerProps) => {
	return (
		<>
			<div className="relative mx-auto flex h-inTrade-height w-full flex-row overflow-y-auto  bg-btn-cancel-tekhelet">
				<TradingChart stockBSHistory={stockBSHistory} />
				<div className="mx-4 flex h-full w-full flex-col items-center pt-6 sm:w-[14.875rem]">
					<MyPoint userPointInfo={userPointInfo} />
					<SellStockForm
						userPointInfo={userPointInfo}
						stockPriceInfo={stockPriceInfo}
					/>
				</div>
			</div>
		</>
	);
};

export default SellStockContainer;
