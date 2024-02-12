import ObserverTarget from "@/components/common/observer/ObserveTarget";
import IntersectSpinner from "@/components/common/spinner/IntersectSpinner";
import { IStockInquiry, IStockItem } from "@/interface/stock";
import { selectedStock } from "@/states/tradeStock";
import { RefObject, useEffect } from "react";
import { useResetRecoilState } from "recoil";
import StockItem from "./StockItem";

interface ITradeStockListProps {
	readonly stockList: IStockInquiry[];
	readonly observeTargetRef: RefObject<HTMLDivElement>;
	readonly isFetching: boolean;
}

const TradeStockList = ({
	stockList,
	observeTargetRef,
	isFetching,
}: ITradeStockListProps) => {
	const resetSelectedStocks = useResetRecoilState(selectedStock);

	const flatStockList = stockList.flatMap((stock) => {
		return stock.results.flatMap((result) => {
			return result;
		});
	});

	const isExist = flatStockList.length === 0;

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
				<>
					{flatStockList.map((stockItem: IStockItem) => (
						<StockItem key={stockItem.id} stockItem={stockItem} />
					))}
					{isFetching ? (
						<IntersectSpinner />
					) : (
						<ObserverTarget observeTargetRef={observeTargetRef} />
					)}
				</>
			)}
		</div>
	);
};

export default TradeStockList;
