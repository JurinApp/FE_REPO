import useAxios from "@/hooks/useAxios";
import { ITodayTradeStockResponseData } from "@/interface/stock";
import { TodayTradeFilterState } from "@/states/filterState/TodayTradeFilterState";
import { userRoleState } from "@/states/userRoleState";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

interface IInfinityQueryData {
	readonly pageParams: number[];
	readonly pages: ITodayTradeStockResponseData[];
}

interface TRADE_TYPE {
	readonly [key: string]: string | number;
}

const TRADE_TYPE: TRADE_TYPE = {
	all: "",
	buy: 1,
	sell: 2,
};

const useTodayTradeStockList = () => {
	const userRole = useRecoilValue(userRoleState);
	const filterState = useRecoilValue(TodayTradeFilterState);
	const { channelId } = useParams();
	const { axiosData } = useAxios();
	const navigate = useNavigate();

	const getTodayTradeStocks = async (param: number) => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/${userRole}s/api/v1/channels/${channelId}/stocks/trades/today?limit=15&offset=${param}&trade_type=${TRADE_TYPE[filterState]}`,
		});

		if (response?.status === 500) {
			navigate("/mypage");
		}

		return response?.data.data;
	};

	return useInfiniteQuery<
		ITodayTradeStockResponseData,
		Error,
		IInfinityQueryData
	>({
		queryKey: ["todayTradeStocks", channelId, filterState],
		queryFn: ({ pageParam }) => getTodayTradeStocks(pageParam as number),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			return lastPage.next !== null ? lastPage.offset + 15 : undefined;
		},
	});
};

export default useTodayTradeStockList;
