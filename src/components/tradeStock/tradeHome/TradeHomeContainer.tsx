import Spinner from "@/components/common/spinner/Spinner";
import useAxios from "@/hooks/useAxios";
import { useIntersectionObserver } from "@/hooks/useObserver";
import { IStockInquiry } from "@/interface/stock";
import { userRoleState } from "@/states/userRoleState";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import DeleteRegisterButton from "./DeleteRegisterButton";
import DeleteStocksModal from "./DeleteStocksModal";
import StockList from "./StockList";
import TradeHomeHeading from "./TradeHomeHeading";

interface IInfinityQueryData {
	readonly pageParams: number[];
	readonly pages: IStockInquiry[];
}

const TradeHomeContainer = () => {
	const userRole = useRecoilValue(userRoleState);
	const { channelId } = useParams();
	const { axiosData } = useAxios();

	const getTradeStocksData = async (pageParam: number) => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/${userRole}s/api/v1/channels/${channelId}/stocks?limit=15&offset=${pageParam}`,
		});

		const resultData: IStockInquiry = response?.data.data;
		return resultData;
	};

	const { data, isFetching, isLoading, hasNextPage, fetchNextPage } =
		useInfiniteQuery<IStockInquiry, Error, IInfinityQueryData>({
			queryKey: ["stocks", channelId],
			queryFn: ({ pageParam }) => getTradeStocksData(pageParam as number),
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
		<div className="relative mx-auto h-[calc(100vh-10.7rem)] w-full bg-btn-cancel-tekhelet px-4 sm:w-[24.563rem]">
			{isLoading || !data ? (
				<Spinner />
			) : (
				<>
					<TradeHomeHeading stockList={data.pages} />
					<StockList
						responseData={data.pages}
						observeTargetRef={observeTargetRef}
						isFetching={isFetching}
					/>
					<DeleteRegisterButton />
					<DeleteStocksModal />
				</>
			)}
		</div>
	);
};

export default TradeHomeContainer;
