import {
	IStockBSHistory,
	IStockPriceInfo,
	IUserPointInfo,
} from "@/interface/stock";
import TradingChart from "../tradingChart/TradingChart";
import BuyStockForm from "./BuyStockForm";
import MyPoint from "../MyPoint";

interface IStockBuyContainerProps {
	readonly userPointInfo: IUserPointInfo;
	readonly stockPriceInfo: IStockPriceInfo;
	readonly stockBSHistory: IStockBSHistory;
}

const BuyStockContainer = ({
	userPointInfo,
	stockPriceInfo,
	stockBSHistory,
}: IStockBuyContainerProps) => {
	return (
		<>
			<div className="relative mx-auto flex h-inTrade-height w-full flex-row overflow-y-auto  bg-btn-cancel-tekhelet">
				<TradingChart stockBSHistory={stockBSHistory} />
				<div className="mx-4 flex h-full w-full flex-col items-center pt-6 sm:w-[14.875rem]">
					<MyPoint userPointInfo={userPointInfo} />
					<BuyStockForm
						stockPriceInfo={stockPriceInfo}
						userPointInfo={userPointInfo}
					/>
				</div>
			</div>
		</>
	);
};

export default BuyStockContainer;
