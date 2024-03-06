import useAxios from "@/hooks/useAxios";
import { myItemFilterState } from "@/states/filterState/myItemFilterState";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

interface IApiUrl {
	[key: string]: string;
}

const useMyItemList = () => {
	const filterState = useRecoilValue(myItemFilterState);
	const { channelId } = useParams();
	const { axiosData } = useAxios();

	const getMyItemList = async (pageParam: number) => {
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

	return useInfiniteQuery({
		queryKey: ["studentItem", "myItem", channelId, filterState],
		queryFn: ({ pageParam }) => getMyItemList(pageParam as number),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			return lastPage.next !== null ? lastPage.offset + 15 : undefined;
		},
	});
};

export default useMyItemList;
