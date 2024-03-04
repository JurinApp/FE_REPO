import {
	IStockBSHistory,
	IStockPriceInfo,
	IUserPointInfo,
} from "@/interface/stock";
import TradingChart from "../TradingChart";
import BuyStockForm from "./BuyStockForm";
import MyPoint from "./MyPoint";

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
			<div className="relative mx-auto h-inTrade-height w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				<div className="flex flex-row">
					<TradingChart stockBSHistory={stockBSHistory} />
					<div className="mx-4 flex w-[14.875rem] flex-col items-center pt-6">
						<MyPoint userPointInfo={userPointInfo} />
						<BuyStockForm
							stockPriceInfo={stockPriceInfo}
							userPointInfo={userPointInfo}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default BuyStockContainer;
