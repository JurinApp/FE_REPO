import ObserveTarget from "@/components/common/observer/ObserveTarget";
import MyStockItem from "./MyStockItem";
import { IMyStock, IMyStockResponseData } from "@/interface/stock";
import { RefObject, useMemo } from "react";
import IntersectSpinner from "@/components/common/spinner/IntersectSpinner";

interface IMyStockListProps {
	readonly responseData: IMyStockResponseData[];
	readonly isFetching: boolean;
	readonly observeTargetRef: RefObject<HTMLDivElement>;
}

const MyStockList = ({
	responseData,
	isFetching,
	observeTargetRef,
}: IMyStockListProps) => {
	const flatMyStockList = responseData.flatMap((data) => {
		return data.results.flatMap((stock) => {
			return stock;
		});
	});

	const isExist = useMemo(() => {
		return flatMyStockList.length === 0;
	}, [flatMyStockList]);

	return (
		<div
			className={`h-[calc(100vh-22rem)] overflow-y-auto pt-2 ${
				isExist && "flex items-center justify-center"
			}`}
		>
			{isExist ? (
				<p className="text-black-700">등록된 주식이 없습니다.</p>
			) : (
				<>
					{flatMyStockList.map((myStock: IMyStock) => (
						<MyStockItem key={myStock.id} myStock={myStock} />
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

export default MyStockList;
