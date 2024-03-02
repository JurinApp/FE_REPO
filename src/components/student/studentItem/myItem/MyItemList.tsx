import ObserveTarget from "@/components/common/observer/ObserveTarget";
import IntersectSpinner from "@/components/common/spinner/IntersectSpinner";
import { IMyItemResponseData } from "@/interface/item";
import { myItemFilterState } from "@/states/filterState/myItemFilterState";
import { RefObject, useMemo } from "react";
import { useRecoilValue } from "recoil";
import ConsumedMyItem from "./ConsumedMyItem";
import MyItem from "./MyItem";

interface IMyItemListProps {
	readonly responseData: IMyItemResponseData[];
	readonly observeTargetRef: RefObject<HTMLDivElement>;
	readonly isFetching: boolean;
}

interface IIsNotExistText {
	readonly [key: string]: string;
}

const MyItemList = ({
	responseData,
	observeTargetRef,
	isFetching,
}: IMyItemListProps) => {
	const itemFilterState = useRecoilValue(myItemFilterState);

	const isNotExistText = useMemo(() => {
		const text: IIsNotExistText = {
			all: "구매한 아이템이 없습니다.",
			available: "사용 가능한 아이템이 없습니다.",
			used: "사용 완료한 아이템이 없습니다.",
		};

		return text[itemFilterState];
	}, [itemFilterState]);

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
		<div
			className={`h-[calc(100vh-16rem)] max-h-[36rem] overflow-y-auto ${
				isExistMyItemList && "flex items-center justify-center"
			}`}
		>
			{isExistMyItemList ? (
				<p className="text-black-700">{isNotExistText}</p>
			) : (
				<div className="mx-4 mt-[1.5rem] grid grid-cols-1 gap-1 gap-y-[0.875rem] overflow-auto rounded-[0.25rem] sm:grid-cols-3 xs:grid-cols-2">
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
				</div>
			)}
		</div>
	);
};

export default MyItemList;
