import Spinner from "@/components/common/spinner/Spinner";
import useAxios from "@/hooks/useAxios";
import { useIntersectionObserver } from "@/hooks/useObserver";
import { TodayTradeFilterState } from "@/states/TodayTradeFilterState";
import { userRoleState } from "@/states/userRoleState";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import FilterButton from "./FilterButton";
import TodayTradeStockList from "./TodayTradeStockList";

interface TRADE_TYPE {
	readonly [key: string]: string | number;
}

const TRADE_TYPE: TRADE_TYPE = {
	all: "",
	buy: 1,
	sell: 2,
};

export interface ITodayTradeStockItem {
	readonly id: number;
	readonly amount: number;
	readonly name: string;
	readonly daysRangeRate: string;
	readonly daysRangePrice: string;
	readonly tradeType: string;
}

export interface ITodayTradeStock {
	readonly limit: number;
	readonly offset: number;
	readonly count: number;
	readonly next: string;
	readonly previous: string;
	readonly results: ITodayTradeStockItem[];
}

interface IInfinityQueryData {
	readonly pageParams: number[];
	readonly pages: ITodayTradeStock[];
}

const TodayTradeContainer = () => {
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

	const { data, isFetching, isLoading, hasNextPage, fetchNextPage } =
		useInfiniteQuery<ITodayTradeStock, Error, IInfinityQueryData>({
			queryKey: ["todayTradeStocks", channelId, filterState],
			queryFn: ({ pageParam }) => getTodayTradeStocks(pageParam as number),
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
		<div className="mx-auto w-full bg-btn-cancel-tekhelet px-4 sm:w-[24.536rem]">
			{isLoading || !data ? (
				<Spinner />
			) : (
				<>
					<FilterButton />
					<TodayTradeStockList
						responseData={data.pages}
						observeTargetRef={observeTargetRef}
						isFetching={isFetching}
					/>
				</>
			)}
		</div>
	);
};

export default TodayTradeContainer;
