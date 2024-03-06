import Spinner from "@/components/common/spinner/Spinner";
import useTodayTradeStockList from "@/hooks/queries/stock/useTodayTradeStockList";
import { useIntersectionObserver } from "@/hooks/useObserver";
import FilterButton from "./FilterButton";
import TodayTradeStockList from "./TodayTradeStockList";

const TodayTradeContainer = () => {
	const { data, isFetching, isLoading, hasNextPage, fetchNextPage } =
		useTodayTradeStockList();

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
