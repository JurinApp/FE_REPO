import React, { useState } from "react";
import ItemFilterButton from "./ItemFilterButton";
import Item from "./Item";
import MyItem from "./MyItem";
import { useRecoilValue } from "recoil";
import { myItemFilterState } from "@/states/myItemFilterState";
import ItemUseModal from "./ItemUseModal";

const ITEM_LIST = [
	{
		itemId: "1",
		itemName: "창가자리 지정석",
		quantity: 5,
	},
	{
		itemId: "2",
		itemName: "창문닦이 당번",
		quantity: 5,
	},
	{
		itemId: "3",
		itemName: "숙제 면제권",
		quantity: 5,
	},
	{
		itemId: "4",
		itemName: "초고우유 교환권",
		quantity: 0,
	},
	{
		itemId: "5",
		itemName: "영화 티켓 2매",
		quantity: 5,
	},
	{
		itemId: "6",
		itemName: "선생님이랑 틱톡",
		quantity: 0,
	},
	{
		itemId: "7",
		itemName: "선생님이랑 틱톡",
		quantity: 5,
	},
];
export interface IMyItem {
	itemId: string;
	itemName: string;
	quantity: number;
}
const MyItemContainer = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<IMyItem | null>(null);
	const handleModalClose = () => {
		setIsModalOpen(false);
	};
	const handleModalOpen = (item: IMyItem) => {
		setSelectedItem(item);
		setIsModalOpen(true);
	};
	const filterState = useRecoilValue(myItemFilterState);
	const useItem = () => {
		console.log("사용");
	};
	return (
		<>
			<div className="relative mx-auto flex h-inTrade-height w-full flex-col bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				<ItemFilterButton />
				<div className="mx-4 mt-[24px] grid h-[188px] grid-cols-1 gap-x-2 gap-y-[14px] sm:grid-cols-3 xs:grid-cols-2">
					{ITEM_LIST.filter((item) => {
						if (filterState === "all") return true;
						if (filterState === "available") return item.quantity > 0;
						if (filterState === "used") return item.quantity === 0;
					}).map((item) => (
						<>
							<div
								onClick={
									item.quantity !== 0 ? () => handleModalOpen(item) : undefined
								}
							>
								<MyItem
									itemId={item.itemId}
									itemName={item.itemName}
									quantity={item.quantity}
								/>
							</div>
						</>
					))}
				</div>
			</div>
			{selectedItem && (
				<ItemUseModal
					isModalOpen={isModalOpen}
					onCancel={handleModalClose}
					onConfirm={useItem}
					item={selectedItem}
				/>
			)}
		</>
	);
};

export default MyItemContainer;
