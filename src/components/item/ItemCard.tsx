import { IItem } from "@/interface/item";
import { selectedItemState } from "@/states/selectedItemState";
import Logo from "@assets/svg/subColorLogo.svg?react";
import { useEffect } from "react";
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

	useEffect(() => {
		return () => {
			setSelectedItems([]);
		};
	}, []);

	return (
		<div className="relative mb-[0.875rem] flex h-40 w-[7.188rem] flex-col rounded-[0.25rem]">
			<div className="bg-sub2-selected flex h-[7.188rem] w-full items-center justify-center rounded-t-[0.25rem]">
				<input
					type="checkbox"
					className="absolute left-2 top-2 h-6 w-6"
					onChange={onClickItemHandler}
					checked={selectedItems.includes(item.itemId) ? true : false}
				/>
				<Logo width={52} height={62} />
			</div>
			<div className="flex grow items-center justify-center rounded-b-[0.25rem] bg-white">
				<p className="text-sm">{item.itemName}</p>
			</div>
		</div>
	);
};

export default ItemCard;
