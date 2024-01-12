import { IItem } from "@/interface/item";
import ItemCard from "./ItemCard";
import {
	allCheckItemsState,
	selectedItemState,
} from "@/states/selectedItemState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";

interface IItemListProps {
	readonly itemList: IItem[];
}

const ItemList = ({ itemList }: IItemListProps) => {
	const selectedItems = useRecoilValue(selectedItemState);
	const setIsAllCheck = useSetRecoilState(allCheckItemsState);

	useEffect(() => {
		if (selectedItems.length === itemList.length) {
			setIsAllCheck(true);
		} else {
			setIsAllCheck(false);
		}
	}, [selectedItems]);

	return (
		<div className="mt-2 grid grid-cols-3 place-items-center">
			{itemList.map((item: IItem) => (
				<ItemCard item={item} key={item.itemId}/>
			))}
		</div>
	);
};

export default ItemList;
