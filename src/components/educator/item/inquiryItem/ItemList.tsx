import { IItem, IItemResponseData } from "@/interface/item";
import ItemCard from "./ItemCard";
import {
	allCheckItemsState,
	selectedItemState,
} from "@/states/selectedState/selectedItemState";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { RefObject, useEffect } from "react";
import IntersectSpinner from "@/components/common/spinner/IntersectSpinner";
import ObserveTarget from "@/components/common/observer/ObserveTarget";

interface IItemListProps {
	readonly responseData: IItemResponseData[];
	readonly isFetching: boolean;
	readonly observeTargetRef: RefObject<HTMLDivElement>;
}

const ItemList = ({
	responseData,
	isFetching,
	observeTargetRef,
}: IItemListProps) => {
	const selectedItems = useRecoilValue(selectedItemState);
	const setIsAllCheck = useSetRecoilState(allCheckItemsState);
	const resetSelectedItems = useResetRecoilState(selectedItemState);

	const flatMapItemList = responseData.flatMap((data) => {
		return data.results.flatMap((item) => {
			return item;
		});
	});

	const isExist = flatMapItemList.length === 0;

	useEffect(() => {
		if (selectedItems.length === flatMapItemList.length) {
			setIsAllCheck(true);
		} else {
			setIsAllCheck(false);
		}
	}, [selectedItems]);

	useEffect(() => {
		return () => {
			resetSelectedItems();
		};
	}, []);

	return (
		<div
			className={`mt-2 h-[calc(100vh-16rem)] max-h-[36rem] overflow-y-auto ${
				isExist && "flex items-center justify-center"
			}`}
		>
			{isExist ? (
				<p className="text-black-700">등록된 아이템이 없습니다.</p>
			) : (
				<div className="grid grid-cols-1 gap-1 sm:grid-cols-3 xs:grid-cols-2">
					<>
						{flatMapItemList.map((item: IItem) => (
							<ItemCard item={item} key={item.id} />
						))}
						{isFetching ? (
							<IntersectSpinner />
						) : (
							<ObserveTarget observeTargetRef={observeTargetRef} />
						)}
					</>
				</div>
			)}
		</div>
	);
};

export default ItemList;
