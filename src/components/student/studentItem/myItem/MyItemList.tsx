import { IMyItemResponseData } from "@/interface/item";
import { RefObject, useMemo } from "react";
import MyItem from "./MyItem";
import IntersectSpinner from "@/components/common/spinner/IntersectSpinner";
import ObserveTarget from "@/components/common/observer/ObserveTarget";
import ConsumedMyItem from "./ConsumedMyItem";

interface IMyItemListProps {
	readonly responseData: IMyItemResponseData[];
	readonly observeTargetRef: RefObject<HTMLDivElement>;
	readonly isFetching: boolean;
}

const MyItemList = ({
	responseData,
	observeTargetRef,
	isFetching,
}: IMyItemListProps) => {
	const flatMyItemList = useMemo(() => {
		return responseData.flatMap((data) => {
			return data.results.flatMap((myItem) => {
				return myItem;
			});
		});
	}, [responseData]);

	const isExistMyItemList = useMemo(() => {
		return flatMyItemList.length === 0;
	}, [responseData]);

	return (
		<div className="mx-4 mt-[1.5rem] grid h-[34.563rem] grid-cols-1 gap-1 gap-y-[0.875rem] overflow-auto rounded-[0.25rem] sm:grid-cols-3 xs:grid-cols-2">
			{isExistMyItemList ? (
				<p className="text-black-700">등록된 주식이 없습니다.</p>
			) : (
				<>
					{flatMyItemList.map((myItem) =>
						myItem.remainingAmount === 0 ? (
							<ConsumedMyItem key={myItem.id} myItem={myItem} />
						) : (
							<MyItem key={myItem.id} myItem={myItem} />
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

export default MyItemList;
