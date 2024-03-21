import Spinner from "@/components/common/spinner/Spinner";
import useMyItemList from "@/hooks/queries/item/useMyItemList";
import {
	itemHistoryModalState,
	itemUseModalState,
} from "@/states/modalState/confirmModalState";
import { useRecoilValue } from "recoil";
import ItemFilterButton from "./MyItemFilter";
import MyItemList from "./MyItemList";
import ItemHistoryModal from "./modal/ItemHistoryModal";
import ItemUseModal from "./modal/ItemUseModal";

const MyItemContainer = () => {
	const isOpenMyItemUseModal = useRecoilValue(itemUseModalState);
	const isOpenMyItemHistoryModal = useRecoilValue(itemHistoryModalState);
	const { data, isLoading } = useMyItemList();

	return (
		<div className="relative mx-auto flex h-inTrade-height w-full flex-col bg-btn-cancel-tekhelet sm:w-[24.536rem]">
			{isLoading || !data ? (
				<Spinner />
			) : (
				<>
					<ItemFilterButton />
					<MyItemList data={data} />
				</>
			)}
			{isOpenMyItemUseModal && <ItemUseModal />}
			{isOpenMyItemHistoryModal && <ItemHistoryModal />}
		</div>
	);
};

export default MyItemContainer;
