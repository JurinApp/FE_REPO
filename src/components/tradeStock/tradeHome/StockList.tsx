import ObserveTarget from "@/components/common/observer/ObserveTarget";
import IntersectSpinner from "@/components/common/spinner/IntersectSpinner";
import { IStockHomeResponseData, IStockItem } from "@/interface/stock";
import { selectedStock } from "@/states/selectedState/selectedTradeStock";
import { RefObject, useEffect, useMemo } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import StockItem from "./StockItem";
import { userRoleState } from "@/states/userRoleState";

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
	const userRole = useRecoilValue(userRoleState);
	const resetSelectedStocks = useResetRecoilState(selectedStock);

	const flatStockList = responseData.flatMap((data) => {
		return data.results.flatMap((stock) => {
			return stock;
		});
	});

	const isExist = useMemo(() => {
		return flatStockList.length === 0;
	}, [flatStockList]);

	useEffect(() => {
		return () => {
			resetSelectedStocks();
		};
	}, []);

	return (
		<div
			className={`${
				userRole === "teacher"
					? "h-[calc(100vh-22rem)]"
					: "h-[calc(100vh-12rem)]"
			} overflow-y-auto pt-2 ${isExist && "flex items-center justify-center"}`}
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
