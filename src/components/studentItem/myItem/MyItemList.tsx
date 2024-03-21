import {
	IAvailableItem,
	IMyItem,
	IMyItemListData,
	IUsedItem,
} from "@/interface/item";
import { myItemFilterState } from "@/states/filterState/myItemFilterState";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import ConsumedMyItem from "./ConsumedMyItem";
import MyItem from "./MyItem";

interface IMyItemListProps {
	readonly data: IMyItemListData;
}

interface IIsNotExistText {
	readonly [key: string]: string;
}

const MyItemList = ({ data }: IMyItemListProps) => {
	const itemFilterState = useRecoilValue(myItemFilterState);

	const myItemList: (IUsedItem | IAvailableItem)[] = useMemo(() => {
		const availableItems = data.availableItem.map((item: IMyItem) => {
			return { ...item, type: "available" };
		});

		const usedItems = data.usedItem.map((item: IMyItem) => {
			return { ...item, type: "used" };
		});

		return [...usedItems, ...availableItems];
	}, [data]);

	const isNotExistText = useMemo(() => {
		const text: IIsNotExistText = {
			all: "구매한 아이템이 없습니다.",
			available: "사용 가능한 아이템이 없습니다.",
			used: "사용 완료한 아이템이 없습니다.",
		};

		return text[itemFilterState];
	}, [itemFilterState]);

	const isExistMyItemList = useMemo(() => {
		return myItemList.length === 0;
	}, [myItemList]);

	return (
		<div
			className={`h-[calc(100vh-16rem)] max-h-[40rem] overflow-y-auto ${
				isExistMyItemList && "flex items-center justify-center"
			}`}
		>
			{isExistMyItemList ? (
				<p className="text-black-700">{isNotExistText}</p>
			) : (
				<div className="mx-4 mt-[1.5rem] grid grid-cols-1 gap-1 overflow-auto rounded-[0.25rem] sm:grid-cols-3 xs:grid-cols-2">
					{myItemList.map((myItem, index) =>
						"usedAmount" in myItem ? (
							<ConsumedMyItem key={index} myItem={myItem} />
						) : (
							<MyItem key={index} myItem={myItem} />
						),
					)}
				</div>
			)}
		</div>
	);
};

export default MyItemList;
