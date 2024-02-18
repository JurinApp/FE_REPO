import { useState } from "react";
import Item from "./Item";
import ItemBuyModal from "./ItemBuyModal";
import { useSetRecoilState } from "recoil";
import { itemBuyModalState } from "@/states/modalState/confirmModalState";

const ITEM_LIST = [
	{
		itemId: "1",
		itemName: "창가자리 지정석",
		quantity: 5,
		price: 500,
	},
	{
		itemId: "2",
		itemName: "창문닦이 당번",
		quantity: 5,
		price: 500,
	},
	{
		itemId: "3",
		itemName: "숙제 면제권",
		quantity: 5,
		price: 1500,
	},
	{
		itemId: "4",
		itemName: "초고우유 교환권",
		quantity: 5,
		price: 1000,
	},
	{
		itemId: "5",
		itemName: "영화 티켓 2매",
		quantity: 5,
		price: 2500,
	},
	{
		itemId: "6",
		itemName: "선생님이랑 틱톡",
		quantity: 5,
		price: 1500,
	},
	{
		itemId: "7",
		itemName: "선생님이랑 틱톡",
		quantity: 5,
		price: 1500,
	},
];

export interface IItem {
	itemId: string;
	itemName: string;
	quantity: number;
	price: number;
}
const ItemContainer = () => {
	const setIsItemBuyModalOpen = useSetRecoilState(itemBuyModalState);
	const [selectedItem, setSelectedItem] = useState<IItem | null>(null);

	const handleModalOpen = (item: IItem) => {
		setSelectedItem(item);
		setIsItemBuyModalOpen(true);
	};

	const buyItem = () => {
		console.log("구매");
	};
	return (
		<>
			<div className="relative mx-auto flex h-inTrade-height w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				<div className="mx-4 mt-6 grid h-[34.563rem] grid-cols-1 gap-x-2 gap-y-[0.875rem] overflow-scroll sm:grid-cols-3 xs:grid-cols-2">
					{ITEM_LIST.map((item) => (
						<div key={item.itemId}>
							<div onClick={() => handleModalOpen(item)}>
								<Item
									itemId={item.itemId}
									itemName={item.itemName}
									price={item.price}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
			{selectedItem && <ItemBuyModal onConfirm={buyItem} item={selectedItem} />}
		</>
	);
};

export default ItemContainer;
