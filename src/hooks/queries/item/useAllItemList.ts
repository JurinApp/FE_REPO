import useAxios from "@/hooks/useAxios";
import { IItemResponseData } from "@/interface/item";
import { userRoleState } from "@/states/userRoleState";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

interface IInfinityQueryData {
	readonly pageParams: number[];
	readonly pages: IItemResponseData[];
}

const useAllItemList = () => {
	const userRole = useRecoilValue(userRoleState);
	const { axiosData } = useAxios();
	const { channelId } = useParams();

	const getItemsData = async (param: number) => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/${userRole}s/api/v1/channels/${channelId}/items?limit=15&offset=${param}`,
		});

		return response?.data.data;
	};

	return useInfiniteQuery<IItemResponseData, Error, IInfinityQueryData>({
		queryKey: ["items", channelId],
		queryFn: ({ pageParam }) => getItemsData(pageParam as number),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			return lastPage.next !== null ? lastPage.offset + 15 : undefined;
		},
	});
};

export default useAllItemList;
