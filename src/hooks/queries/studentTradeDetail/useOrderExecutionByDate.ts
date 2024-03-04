import useAxios from "@/hooks/useAxios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface IDate {
	readonly startDate: string;
	readonly endDate: string;
}

const useOrderExecutionByDate = (date: IDate) => {
	const { channelId, stockId } = useParams();
	const { axiosData } = useAxios();

	const getOrderExecutionByDateList = async (pageParam: number) => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/students/api/v1/channels/${channelId}/stocks/${stockId}/trades/mine?limit=15&offset=${pageParam}&start_date=${date.startDate}&end_date=${date.endDate}`,
		});
		return response?.data.data;
	};

	return useInfiniteQuery({
		queryKey: [
			"orderExecutionByDateList",
			channelId,
			stockId,
			date.startDate,
			date.endDate,
		],
		queryFn: ({ pageParam }) => getOrderExecutionByDateList(pageParam),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			return lastPage.next !== null ? lastPage.offset + 15 : undefined;
		},
	});
};

export default useOrderExecutionByDate;
