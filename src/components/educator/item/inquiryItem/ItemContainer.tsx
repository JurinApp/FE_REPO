import { useRecoilValue } from "recoil";
import DeleteRegisterButton from "./DeleteRegisterButton";
import ItemHeadingTitle from "./ItemHeadingTitle";
import ItemList from "./ItemList";
import { deleteItemsModalState } from "@/states/confirmModalState";
import DeleteItemModal from "./DeleteItemModal";

const ITEM_LIST = [
	{
		itemId: "1",
		itemName: "창가자리 지정석",
	},
	{
		itemId: "2",
		itemName: "창문닦이 당번",
	},
	{
		itemId: "3",
		itemName: "숙데 면제권",
	},
	{
		itemId: "4",
		itemName: "초고우유 교환권",
	},
	{
		itemId: "5",
		itemName: "영화 티켓 2매",
	},
	{
		itemId: "6",
		itemName: "선생님이랑 틱톡",
	},
	{
		itemId: "7",
		itemName: "창가자리 지정석",
	},
	{
		itemId: "8",
		itemName: "창문닦이 당번",
	},
];

const ItemContainer = () => {
	const isOpenDeleteItemsModal = useRecoilValue(deleteItemsModalState);

	return (
		<div className="relative mx-auto h-body-height w-full bg-btn-cancel-tekhelet px-4 sm:w-[24.563rem]">
			<ItemHeadingTitle itemList={ITEM_LIST} />
			<ItemList itemList={ITEM_LIST} />
			<DeleteRegisterButton />
			{isOpenDeleteItemsModal && <DeleteItemModal />}
		</div>
	);
};

export default ItemContainer;
