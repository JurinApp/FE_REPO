import useAxios from "@/hooks/useAxios";
import { IStockHomeResponseData } from "@/interface/stock";
import { userRoleState } from "@/states/userRoleState";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

interface IInfinityQueryData {
	readonly pageParams: number[];
	readonly pages: IStockHomeResponseData[];
}

const useAllStockList = () => {
	const userRole = useRecoilValue(userRoleState);
	const { channelId } = useParams();
	const { axiosData } = useAxios();

	const getTradeStocksData = async (pageParam: number) => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/${userRole}s/api/v1/channels/${channelId}/stocks?limit=15&offset=${pageParam}`,
		});

		const resultData = response?.data.data;
		return resultData;
	};

	return useInfiniteQuery<IStockHomeResponseData, Error, IInfinityQueryData>({
		queryKey: ["stocks", channelId],
		queryFn: ({ pageParam }) => getTradeStocksData(pageParam as number),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			return lastPage.next !== null ? lastPage.offset + 15 : undefined;
		},
	});
};

export default useAllStockList;
