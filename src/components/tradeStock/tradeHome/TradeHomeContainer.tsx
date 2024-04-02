import Spinner from "@/components/common/spinner/Spinner";
import useAllStockList from "@/hooks/queries/stock/useAllStockList";
import { useIntersectionObserver } from "@/hooks/useObserver";
import DeleteRegisterButton from "./DeleteRegisterButton";
import DeleteStocksModal from "./DeleteStocksModal";
import StockList from "./StockList";
import TradeHomeHeading from "./TradeHomeHeading";

const TradeHomeContainer = () => {
	const { data, isFetching, isLoading, hasNextPage, fetchNextPage } =
		useAllStockList();

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
