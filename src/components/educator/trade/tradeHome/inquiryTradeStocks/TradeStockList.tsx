import { IStockItem } from "@/interface/tradeHome";
import { selectedStock } from "@/states/tradeStock";
import { useEffect } from "react";
import { useResetRecoilState } from "recoil";
import TradeStockItem from "./TradeStockItem";

interface ITradeStockListProps {
	readonly stockList: IStockItem[];
}

const TradeStockList = ({ stockList }: ITradeStockListProps) => {
	const resetSelectedStocks = useResetRecoilState(selectedStock);

	useEffect(() => {
		return () => {
			resetSelectedStocks();
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
