import ObserveTarget from "@/components/common/observer/ObserveTarget";
import IntersectSpinner from "@/components/common/spinner/IntersectSpinner";
import { IOrderExecution } from "@/interface/stock";
import { RefObject, useMemo } from "react";
import OrderExecutionItem from "./OrderExecutionItem";

export interface IOrderExecutionResponseData {
	readonly limit: number;
	readonly offset: number;
	readonly count: number;
	readonly next: string | null;
	readonly previous: string | null;
	readonly results: IOrderExecution[];
}

interface IOrderExecutionListProps {
	readonly responseData: IOrderExecutionResponseData[];
	readonly isFetching: boolean;
	readonly observeTargetRef: RefObject<HTMLDivElement>;
}

const OrderExecutionList = ({
	responseData,
	isFetching,
	observeTargetRef,
}: IOrderExecutionListProps) => {
	const flatOrderExecutionList = responseData.flatMap((data) => {
		return data.results.flatMap((order) => {
			return order;
		});
	});

	const isExist = useMemo(() => {
		return flatOrderExecutionList.length === 0;
	}, [flatOrderExecutionList]);

	return (
		<div
			className={`mt-4 h-[calc(100vh-18rem)] w-full overflow-y-auto ${
				isExist && "flex items-center justify-center"
			}`}
		>
			{isExist ? (
				<p className="text-black-800">거래된 내역이 없습니다.</p>
			) : (
				<>
					{flatOrderExecutionList.map(
						(order: IOrderExecution, index: number) => (
							<OrderExecutionItem key={index + order.name} order={order} />
						),
					)}
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

export default OrderExecutionList;
