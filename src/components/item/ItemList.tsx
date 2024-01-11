import { IItem } from "@/interface/item";
import ItemCard from "./ItemCard";

interface IItemListProps {
	readonly itemList: IItem[];
}

const ItemList = ({ itemList }: IItemListProps) => {
	return (
		<div className="mt-2 grid grid-cols-3 place-items-center">
			{itemList.map((item: IItem) => (
				<ItemCard item={item} />
			))}
		</div>
	);
};

export default ItemList;
