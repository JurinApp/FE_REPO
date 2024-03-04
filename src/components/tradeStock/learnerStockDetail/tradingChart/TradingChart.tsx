import { IStockBSHistory } from "@/interface/stock";
import BuyList from "./BuyList";
import SellList from "./SellList";

interface ITradingChartProps {
	readonly stockBSHistory: IStockBSHistory;
}

const TradingChart = ({ stockBSHistory }: ITradingChartProps) => {
	return (
		<div>
			<div className="flex h-inTrade-height w-[7.688rem] flex-col bg-white">
				<BuyList buyList={stockBSHistory.buyList} />
				<SellList sellList={stockBSHistory.sellList} />
			</div>
		</div>
	);
};

export default TradingChart;
