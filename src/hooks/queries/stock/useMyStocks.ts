import useAxios from "@/hooks/useAxios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useMyStocks = () => {
	const { axiosData } = useAxios();
	const { channelId } = useParams();

	const getMyStocks = async (pageParam: number) => {
		const response = await axiosData("useToken", {
			url: `/students/api/v1/channels/${channelId}/stocks/mine?limit=15&offset=${pageParam}`,
		});

		return response?.data.data;
	};

	return useInfiniteQuery({
		queryKey: ["tradeStockDetail", "useMyStocks", channelId],
		queryFn: ({ pageParam }) => getMyStocks(pageParam as number),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			return lastPage.next !== null ? lastPage.offset + 15 : undefined;
		},
	});
};

export default useMyStocks;
