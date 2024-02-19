import ObserveTarget from "@/components/common/observer/ObserveTarget";
import IntersectSpinner from "@/components/common/spinner/IntersectSpinner";
import { IStockHomeResponseData, IStockItem } from "@/interface/stock";
import { selectedStock } from "@/states/selectedState/selectedTradeStock";
import { RefObject, useEffect } from "react";
import { useResetRecoilState } from "recoil";
import StockItem from "./StockItem";

interface ITradeStockListProps {
	readonly responseData: IStockHomeResponseData[];
	readonly observeTargetRef: RefObject<HTMLDivElement>;
	readonly isFetching: boolean;
}

const TradeStockList = ({
	responseData,
	observeTargetRef,
	isFetching,
}: ITradeStockListProps) => {
	const resetSelectedStocks = useResetRecoilState(selectedStock);

	const flatStockList = responseData.flatMap((data) => {
		return data.results.flatMap((stock) => {
			return stock;
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
						<ObserveTarget observeTargetRef={observeTargetRef} />
					)}
				</>
			)}
		</div>
	);
};

export default TradeStockList;
