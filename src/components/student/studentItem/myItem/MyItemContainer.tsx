import Spinner from "@/components/common/spinner/Spinner";
import useAxios from "@/hooks/useAxios";
import { useIntersectionObserver } from "@/hooks/useObserver";
import { myItemFilterState } from "@/states/filterState/myItemFilterState";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import ItemFilterButton from "./MyItemFilter";
import MyItemList from "./MyItemList";
import ItemUseModal from "./modal/ItemUseModal";
import {
	itemHistoryModalState,
	itemUseModalState,
} from "@/states/modalState/confirmModalState";
import ItemHistoryModal from "./modal/ItemHistoryModal";

interface IApiUrl {
	[key: string]: string;
}

const MyItemContainer = () => {
	const filterState = useRecoilValue(myItemFilterState);
	const isOpenMyItemUseModal = useRecoilValue(itemUseModalState);
	const isOpenMyItemHistoryModal = useRecoilValue(itemHistoryModalState);
	const { channelId } = useParams();
	const { axiosData } = useAxios();

	const fetchMyItem = async (pageParam: number) => {
		const apiUrl: IApiUrl = {
			all: `/students/api/v1/channels/${channelId}/items/mine?limit=15&offset=${pageParam}`,
			available: `/students/api/v1/channels/${channelId}/items/mine?limit=15&offset=${pageParam}&is_used=false`,
			used: `/students/api/v1/channels/${channelId}/items/mine?limit=15&offset=${pageParam}&is_used=true`,
		};

		const response = await axiosData("useToken", {
			method: "GET",
			url: apiUrl[filterState],
		});

		return response?.data.data;
	};

	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
		useInfiniteQuery({
			queryKey: ["studentItem", "myItem", channelId, filterState],
			queryFn: ({ pageParam }) => fetchMyItem(pageParam as number),
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
		<div className="relative mx-auto flex h-inTrade-height w-full flex-col bg-btn-cancel-tekhelet sm:w-[24.536rem]">
			{isLoading || !data ? (
				<Spinner />
			) : (
				<>
					<ItemFilterButton />
					<MyItemList
						responseData={data.pages}
						observeTargetRef={observeTargetRef}
						isFetching={isFetching}
					/>
				</>
			)}
			{isOpenMyItemUseModal && <ItemUseModal />}
			{isOpenMyItemHistoryModal && <ItemHistoryModal />}
		</div>
	);
};

export default MyItemContainer;
