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
		<div className="place mt-2 h-[calc(100vh-16rem)] max-h-[36rem] overflow-y-auto">
			<div className="xs:grid-cols-2 grid grid-cols-1 gap-1 sm:grid-cols-3">
				{itemList.map((item: IItem) => (
					<ItemCard item={item} key={item.itemId} />
				))}
			</div>
		</div>
	);
};

export default ItemList;
