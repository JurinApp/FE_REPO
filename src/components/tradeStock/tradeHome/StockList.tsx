import { IStockItem } from "@/interface/tradeHome";
import { selectedStock } from "@/states/tradeStock";
import { useEffect } from "react";
import { useResetRecoilState } from "recoil";
import StockItem from "./StockItem";

interface ITradeStockListProps {
	readonly stockList: IStockItem[];
}

const TradeStockList = ({ stockList }: ITradeStockListProps) => {
	const resetSelectedStocks = useResetRecoilState(selectedStock);
	const isExist = stockList.length === 0;

	useEffect(() => {
		return () => {
			resetSelectedStocks();
		};
	}, []);

	return (
		<div
			className={`mt-2 h-[calc(100vh-22rem)] overflow-y-auto ${
				isExist && "flex items-center justify-center"
			}`}
		>
			{isExist ? (
				<p className="text-black-700">등록된 주식이 없습니다.</p>
			) : (
				stockList.map((stockItem: IStockItem) => (
					<StockItem key={stockItem.id} stockItem={stockItem} />
				))
			)}
		</div>
	);
};

export default TradeStockList;
