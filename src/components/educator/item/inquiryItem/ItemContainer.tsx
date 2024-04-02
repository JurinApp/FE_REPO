import Spinner from "@/components/common/spinner/Spinner";
import useAllItemList from "@/hooks/queries/item/useAllItemList";
import { useIntersectionObserver } from "@/hooks/useObserver";
import DeleteItemModal from "./DeleteItemModal";
import DeleteRegisterButton from "./DeleteRegisterButton";
import ItemHeadingTitle from "./ItemHeadingTitle";
import ItemList from "./ItemList";

const ItemContainer = () => {
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
		useAllItemList();

	const observeTargetRef = useIntersectionObserver({
		hasNextPage,
		fetchNextPage,
	});

	return (
		<div className="relative mx-auto h-body-height w-full bg-btn-cancel-tekhelet px-4 sm:w-[24.563rem]">
			{isLoading || !data ? (
				<Spinner />
			) : (
				<>
					<ItemHeadingTitle responseData={data.pages} />
					<ItemList
						responseData={data.pages}
						isFetching={isFetching}
						observeTargetRef={observeTargetRef}
					/>
					<DeleteRegisterButton />
					<DeleteItemModal />
				</>
			)}
		</div>
	);
};

export default ItemContainer;
