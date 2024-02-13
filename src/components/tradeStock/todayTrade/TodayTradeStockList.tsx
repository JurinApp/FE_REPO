import ObserveTarget from "@/components/common/observer/ObserveTarget";
import IntersectSpinner from "@/components/common/spinner/IntersectSpinner";
import { RefObject } from "react";
import TodayTradeStockItem from "./TodayTradeStockItem";
import {
	ITodayTradeStockResponseData,
	ITodayTradeStockItem,
} from "@/interface/stock";

interface ITodayTradeStockListProps {
	readonly responseData: ITodayTradeStockResponseData[];
	readonly observeTargetRef: RefObject<HTMLDivElement>;
	readonly isFetching: boolean;
}

const TodayTradeStockList = ({
	responseData,
	observeTargetRef,
	isFetching,
}: ITodayTradeStockListProps) => {
	const flatTodayTradeStockList = responseData.flatMap((data) => {
		return data.results.flatMap((stock) => {
			return stock;
		});
	});

	const isExists = flatTodayTradeStockList.length === 0;

	return (
		<div
			className={`mt-4 h-[calc(100vh-15.1rem)] overflow-y-auto ${
				isExists && "flex items-center justify-center"
			}`}
		>
			{isExists ? (
				<p className="text-black-700">거래중인 주식 상품이 없습니다.</p>
			) : (
				<>
					{flatTodayTradeStockList.map((stockItem: ITodayTradeStockItem) => (
						<TodayTradeStockItem key={stockItem.id} stockItem={stockItem} />
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

export default TodayTradeStockList;
