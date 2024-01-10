import { IStockItem } from "@/interface/tradeHome";
import StockItem from "./StockItem";

interface IStockListProps {
	readonly stockList: IStockItem[];
}

const StockList = ({ stockList }: IStockListProps) => {
	return (
		<div className="mt-4 h-[calc(100vh-15.1rem)] overflow-y-auto">
			{stockList.map((stockItem: IStockItem) => (
				<StockItem key={stockItem.key} stockItem={stockItem} />
			))}
		</div>
	);
};

export default StockList;
