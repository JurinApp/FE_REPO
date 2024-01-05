import { IStockItem } from "@/interface/tradeHome";
import TradeStockItem from "./TradeStockItem";

interface ITradeHomeHeadingProps {
	readonly stockList: IStockItem[];
}

const TradeStockList = ({ stockList }: ITradeHomeHeadingProps) => {
	return (
		<div className="mt-6 h-[calc(100vh-19.5rem)] overflow-y-auto">
			{stockList.map((stockItem: IStockItem) => (
				<TradeStockItem key={stockItem.key} stockItem={stockItem} />
			))}
		</div>
	);
};

export default TradeStockList;
