import Spinner from "@/components/common/spinner/Spinner";
import useMyStocks from "@/hooks/queries/stock/useMyStocks";
import { useIntersectionObserver } from "@/hooks/useObserver";
import MyStockList from "./MyStockList";

const MyStockContainer = () => {
	const { data, isFetching, isLoading, hasNextPage, fetchNextPage } =
		useMyStocks();

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
					<MyStockList
						responseData={data.pages}
						observeTargetRef={observeTargetRef}
						isFetching={isFetching}
					/>
				</>
			)}
		</div>
	);
};

export default MyStockContainer;
