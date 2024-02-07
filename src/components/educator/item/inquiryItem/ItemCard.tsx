import { IItem } from "@/interface/item";
import { selectedItemState } from "@/states/selectedItemState";
import Logo from "@assets/svg/subColorLogo.svg?react";
import { Link, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

interface IItemCardProps {
	readonly item: IItem;
}

const ItemCard = ({ item }: IItemCardProps) => {
	const [selectedItems, setSelectedItems] = useRecoilState(selectedItemState);
	const { channelId } = useParams();

	const handleCheckItem = () => {
		const index = selectedItems.findIndex((learnerId) => {
			return learnerId === item.id;
		});

		if (index === -1) {
			setSelectedItems([...selectedItems, item.id]);
		} else {
			const deepCopySelectedItems = [...selectedItems];
			deepCopySelectedItems.splice(index, 1);
			setSelectedItems(deepCopySelectedItems);
		}
	};

	return (
		<div className="relative">
			<Link
				to={`/${channelId}/item/detail/${item.id}`}
				className="mb-[0.875rem] flex h-40 w-full flex-col rounded-[0.25rem] sm:w-[7.188rem]"
			>
				<div className="flex h-[7.188rem] w-full items-center justify-center rounded-t-[0.25rem] bg-sub2-selected">
					{item.imageUrl === "" ? (
						<Logo className="h-[3.875rem] w-[3.25rem]" />
					) : (
						<img
							src={item.imageUrl}
							alt="itemImage"
							className="h-[7.188rem] w-full bg-contain"
						/>
					)}
				</div>
				<div className="flex grow items-center justify-center rounded-b-[0.25rem] bg-white">
					<p className="truncate text-sm">{item.title}</p>
				</div>
			</Link>
			<input
				type="checkbox"
				className="custom-checkBox absolute left-2 top-2 cursor-pointer"
				onChange={handleCheckItem}
				checked={selectedItems.includes(item.id) ? true : false}
			/>
		</div>
	);
};

export default ItemCard;
