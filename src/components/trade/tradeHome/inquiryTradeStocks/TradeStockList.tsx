import { IStockItem } from "@/interface/tradeHome";
import TradeStockItem from "./TradeStockItem";
import { selectedStock } from "@/states/tradeStock";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

interface ITradeStockListProps {
	readonly stockList: IStockItem[];
}

const TradeStockList = ({ stockList }: ITradeStockListProps) => {
	const setSelectedStocks = useSetRecoilState(selectedStock);

	useEffect(() => {
		return () => {
			setSelectedStocks([]);
		};
	}, []);

	return (
		<div className="mt-2 h-[calc(100vh-22rem)] overflow-y-auto">
			{stockList.map((stockItem: IStockItem) => (
				<TradeStockItem key={stockItem.key} stockItem={stockItem} />
			))}
		</div>
	);
};

export default TradeStockList;
