import { IItem } from "@/interface/item";
import { selectedItemState } from "@/states/selectedItemState";
import Logo from "@assets/svg/subColorLogo.svg?react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

interface IItemCardProps {
	readonly item: IItem;
}

const ItemCard = ({ item }: IItemCardProps) => {
	const [selectedItems, setSelectedItems] = useRecoilState(selectedItemState);

	const onClickItemHandler = () => {
		const index = selectedItems.findIndex((learnerId) => {
			return learnerId === item.itemId;
		});

		if (index === -1) {
			setSelectedItems([...selectedItems, item.itemId]);
		} else {
			const deepCopySelectedItems = [...selectedItems];
			deepCopySelectedItems.splice(index, 1);
			setSelectedItems(deepCopySelectedItems);
		}
	};

	return (
		<div className="relative">
			<Link
				to={`/item/detail/${item.itemId}`}
				className="mb-[0.875rem] flex h-40 w-full flex-col rounded-[0.25rem] sm:w-[7.188rem]"
			>
				<div className="flex h-[7.188rem] w-full items-center justify-center rounded-t-[0.25rem] bg-sub2-selected">
					<Logo className="h-[3.875rem] w-[3.25rem]" />
				</div>
				<div className="flex grow items-center justify-center rounded-b-[0.25rem] bg-white">
					<p className="text-sm">{item.itemName}</p>
				</div>
			</Link>
			<input
				type="checkbox"
				className="custom-checkBox absolute left-2 top-2"
				onChange={onClickItemHandler}
				checked={selectedItems.includes(item.itemId) ? true : false}
			/>
		</div>
	);
};

export default ItemCard;
