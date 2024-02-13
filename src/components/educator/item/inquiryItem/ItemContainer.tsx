import Spinner from "@/components/common/spinner/Spinner";
import useAxios from "@/hooks/useAxios";
import { useIntersectionObserver } from "@/hooks/useObserver";
import { IItemResponseData } from "@/interface/item";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import DeleteItemModal from "./DeleteItemModal";
import DeleteRegisterButton from "./DeleteRegisterButton";
import ItemHeadingTitle from "./ItemHeadingTitle";
import ItemList from "./ItemList";

interface IInfinityQueryData {
	readonly pageParams: number[];
	readonly pages: IItemResponseData[];
}

const ItemContainer = () => {
	const { axiosData } = useAxios();
	const { channelId } = useParams();

	const getItemsData = async (param: number) => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/teachers/api/v1/channels/${channelId}/items?limit=15&offset=${param}`,
		});

		return response?.data.data;
	};

	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
		useInfiniteQuery<IItemResponseData, Error, IInfinityQueryData>({
			queryKey: ["items", channelId],
			queryFn: ({ pageParam }) => getItemsData(pageParam as number),
			initialPageParam: 0,
			getNextPageParam: (lastPage) => {
				return lastPage.next !== null ? lastPage.offset + 15 : undefined;
			},
		});

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
