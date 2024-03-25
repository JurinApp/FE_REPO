import Spinner from "@/components/common/spinner/Spinner";
import useAllItemList from "@/hooks/queries/item/useAllItemList";
import { useIntersectionObserver } from "@/hooks/useObserver";
import { itemBuyModalState } from "@/states/modalState/confirmModalState";
import { useRecoilValue } from "recoil";
import ItemBuyModal from "./StudentItemBuyModal";
import StudentItemList from "./StudentItemList";
import UserPoint from "../UserPoint";

const ItemContainer = () => {
	const isItemBuyModalOpen = useRecoilValue(itemBuyModalState);

	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
		useAllItemList();

	const observeTargetRef = useIntersectionObserver({
		hasNextPage,
		fetchNextPage,
	});

	return (
		<>
			<div className="relative mx-auto flex h-inTrade-height w-full flex-col bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				{isLoading || !data ? (
					<Spinner />
				) : (
					<>
						<UserPoint />
						<StudentItemList
							responseData={data.pages}
							isFetching={isFetching}
							observeTargetRef={observeTargetRef}
						/>
					</>
				)}
				{isItemBuyModalOpen && <ItemBuyModal />}
			</div>
		</>
	);
};

export default ItemContainer;
