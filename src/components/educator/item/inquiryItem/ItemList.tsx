import { IItem } from "@/interface/item";
import ItemCard from "./ItemCard";
import {
	allCheckItemsState,
	selectedItemState,
} from "@/states/selectedItemState";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";

interface IItemListProps {
	readonly itemList: IItem[];
}

const ItemList = ({ itemList }: IItemListProps) => {
	const selectedItems = useRecoilValue(selectedItemState);
	const setIsAllCheck = useSetRecoilState(allCheckItemsState);
	const resetSelectedItems = useResetRecoilState(selectedItemState);
	const isExist = itemList.length === 0;

	useEffect(() => {
		if (selectedItems.length === itemList.length) {
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
			className={`place mt-2 h-[calc(100vh-16rem)] max-h-[36rem] overflow-y-auto ${
				isExist && "flex items-center justify-center"
			}`}
		>
			{isExist ? (
				<p className="text-black-700">등록된 아이템이 없습니다.</p>
			) : (
				<div className="grid grid-cols-1 gap-1 sm:grid-cols-3 xs:grid-cols-2">
					{itemList.map((item: IItem) => (
						<ItemCard item={item} key={item.id} />
					))}
				</div>
			)}
		</div>
	);
};

export default ItemList;
