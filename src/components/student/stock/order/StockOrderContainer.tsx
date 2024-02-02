import Calandar from "@assets/svg/calendar.svg?react";
import CalendarModal from "./CalendarModal";
import { useSetRecoilState } from "recoil";
import { calendarModalState } from "@/states/confirmModalState";

const StockOrderContainer = () => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const date = String(today.getDate()).padStart(2, "0");
	const fullDate = `${year}. ${month}. ${date}`;

	const setIsCalendarModalState = useSetRecoilState(calendarModalState);
	const handleCalendarOpen = () => {
		setIsCalendarModalState(true);
	};
	const fetchOrder = () => {
		// TODO: 날짜에 해당하는 주식 거래 내역을 불러오는 API
		console.log("완료");
	};

	return (
		<>
			<div className="relative mx-auto h-inTrade-height w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				<div className="flex justify-center">
					<button
						id="calendar-modal-btn"
						onClick={handleCalendarOpen}
						className="mt-6 flex  h-[38px] w-[131px] flex-row items-center justify-center gap-2 rounded border border-black-300 bg-white"
					>
						<Calandar />
						<p className="text-sm font-bold">{fullDate}</p>
					</button>
				</div>
			</div>
			<CalendarModal fetchOrder={fetchOrder} />
		</>
	);
};

export default StockOrderContainer;
