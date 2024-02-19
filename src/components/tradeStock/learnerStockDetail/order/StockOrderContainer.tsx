import Calendar from "@assets/svg/calendar.svg?react";
import CalendarModal from "./CalendarModal";
import { useRecoilState, useSetRecoilState } from "recoil";
import { calendarModalState } from "@/states/confirmModalState";
import useAxios from "@/hooks/useAxios";
import { endDateState, startDateState } from "@/states/stockOrderState";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface IStockOrderProps {
	channelId: string;
	stockId: string;
}

const StockOrderContainer = ({ channelId, stockId }: IStockOrderProps) => {
	const setIsCalendarModalState = useSetRecoilState(calendarModalState);
	const handleCalendarOpen = () => {
		setIsCalendarModalState(true);
	};
	const { axiosData } = useAxios();
	const [startDate, setStartDate] = useRecoilState(startDateState);
	const [endDate, setEndDate] = useRecoilState(endDateState);

	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const date = String(today.getDate()).padStart(2, "0");
	const fullDate = `${year}. ${month}. ${date}`;
	const formatDate = `${year}-${month}-${date}`;

	useEffect(() => {
		setStartDate(formatDate);
		setEndDate(formatDate);
	}, []);

	const fetchOrderList = async () => {
		const apiUrl = `/students/api/v1/channels/${channelId}/stocks/${stockId}/trades/mine?start_date=${startDate}&end_date=${endDate}`;
		const response = await axiosData("useToken", {
			method: "GET",
			url: apiUrl,
		});
		if (response) {
			const status = response.status;
			if (status === 200) {
				return response.data.data;
			}
		}
	};

	const orderListQuery = useQuery({
		queryKey: ["orderList", channelId, stockId, startDate, endDate],
		queryFn: fetchOrderList,
	});

	// const fetchOrder = () => {
	// 	// TODO: 날짜에 해당하는 주식 거래 내역을 불러오는 API
	// 	console.log("완료");
	// };

	return (
		<>
			<div className="relative mx-auto h-inTrade-height w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				<div className="flex justify-center">
					<button
						id="calendar-modal-btn"
						onClick={handleCalendarOpen}
						className="mt-6 flex  h-[38px] w-[131px] flex-row items-center justify-center gap-2 rounded border border-black-300 bg-white"
					>
						<Calendar />
						<p className="text-sm font-bold">{fullDate}</p>
					</button>
				</div>
			</div>
			<CalendarModal />
		</>
	);
};

export default StockOrderContainer;
