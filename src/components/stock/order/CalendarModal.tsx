import Calandar from "@assets/svg/calendar.svg?react";
import Cancel from "@assets/svg/cancel.svg?react";
import { DateRange, DayPicker } from "react-day-picker";
import { addDays, format } from "date-fns";
import { useState } from "react";
import "react-day-picker/src/style.css";
import "./dayPicker.css";
import { ko } from "date-fns/locale";
interface ICalendarModalProps {
	onCancel: () => void;
	fetchOrder: () => void;
}
const pastMonth = new Date(2024, 1, 1);
const CalendarModal = (props: ICalendarModalProps) => {
	const defaultSelected: DateRange = {
		from: pastMonth,
		to: addDays(pastMonth, 4),
	};
	const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

	let footer = "날짜를 선택해주세요.";
	if (range?.from) {
		if (!range.to) {
			footer = `${format(range.from, "yyyy. MM. dd")}`;
		} else if (range.to) {
			footer = `${format(range.from, "yyyy. MM. dd")} – ${format(
				range.to,
				"MM. dd",
			)}`;
		}
	}

	return (
		<>
			<div className="absolute left-0 right-0 top-[6.512rem] z-[1000] mx-auto ml-auto mr-auto h-inTrade-height w-full bg-calender-back sm:w-[24.536rem]">
				<div className="flex flex-row items-center justify-center">
					<div
						id="calendar-modal-btn"
						className="mt-6 flex h-[38px] w-auto flex-row items-center justify-center gap-2 rounded border border-black-300 bg-white px-[14px]"
					>
						<Calandar />
						<p id="range" className="text-sm font-bold">
							{footer}
						</p>
					</div>
				</div>
				<div
					className="absolute right-4 top-[1.512rem] flex h-[38px] w-[38px]  items-center justify-center"
					onClick={props.onCancel}
				>
					<Cancel />
				</div>
				<div className="mx-4 mt-[14px] flex h-auto w-[361px] items-center justify-center rounded border border-black-300 bg-white">
					<DayPicker
						id="test"
						mode="range"
						defaultMonth={pastMonth}
						selected={range}
						onSelect={setRange}
						locale={ko}
					/>
				</div>
				<button className="mx-4 mt-6 h-[52px] w-[361px] rounded bg-tekhelet text-center text-base font-bold text-white">
					적용하기
				</button>
			</div>
		</>
	);
};

export default CalendarModal;
