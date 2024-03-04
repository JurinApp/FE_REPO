import Spinner from "@/components/common/spinner/Spinner";
import useOrderExecutionByDate from "@/hooks/queries/studentTradeDetail/useOrderExecutionByDate";
import { useIntersectionObserver } from "@/hooks/useObserver";
import { changeFormDateFormat } from "@/utils/changeDateFormat";
import { useState } from "react";
import CalendarModal from "./CalendarModal";
import OrderExecutionList from "./OrderExecutionList";
import SelectDateButton from "./SelectDateButton";
import { IOrderExecutionDate } from "@/interface/stock";

const TODAY_DATE = changeFormDateFormat();

const StockOrderContainer = () => {
	const [date, setDate] = useState<IOrderExecutionDate>({
		startDate: TODAY_DATE,
		endDate: TODAY_DATE,
	});
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
		useOrderExecutionByDate(date);

	const observeTargetRef = useIntersectionObserver({
		hasNextPage,
		fetchNextPage,
	});

	return (
		<div className="relative mx-auto h-inTrade-height bg-btn-cancel-tekhelet px-4 sm:w-[24.563rem]">
			<SelectDateButton date={date} />
			{isLoading || !data ? (
				<Spinner />
			) : (
				<OrderExecutionList
					responseData={data.pages}
					isFetching={isFetching}
					observeTargetRef={observeTargetRef}
				/>
			)}
			<CalendarModal
				setDate={({ startDate, endDate }) => setDate({ startDate, endDate })}
				todayDate={TODAY_DATE}
			/>
		</div>
	);
};

export default StockOrderContainer;
