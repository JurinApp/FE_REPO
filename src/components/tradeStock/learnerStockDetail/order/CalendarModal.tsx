import Calendar from "@assets/svg/calendar.svg?react";
import Cancel from "@assets/svg/cancel.svg?react";
import { DateRange, DayPicker } from "react-day-picker";
import { addDays, format } from "date-fns";
import { useState } from "react";
import "react-day-picker/src/style.css";
import "@/dayPicker.css";
import { ko } from "date-fns/locale";
import { useRecoilState } from "recoil";
import { calendarModalState } from "@/states/confirmModalState";

interface ICalendarModalProps {
	readonly fetchOrder: () => void;
}

const START_DATE = new Date();
const defaultSelected: DateRange = {
	from: START_DATE,

	to: addDays(START_DATE, 4),
};

const CalendarModal = ({ fetchOrder }: ICalendarModalProps) => {
	const [isCalendarModalState, setIsCalendarModalState] =
		useRecoilState(calendarModalState);
	const handleCalendarClose = () => setIsCalendarModalState(false);
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
			<div
				className={`${
					isCalendarModalState ? "absolute" : "hidden"
				} left-0 right-0 top-[6.512rem] z-[1000] mx-auto ml-auto mr-auto h-inTrade-height w-full bg-calender-back sm:w-[24.536rem]`}
			>
				<div className="flex flex-row items-center justify-center">
					<div
						id="calendar-modal-btn"
						className="mt-6 flex h-[2.375rem] w-auto flex-row items-center justify-center gap-2 rounded border border-black-300 bg-white px-[0.875rem]"
					>
						<Calendar />
						<p id="range" className="text-sm font-bold">
							{footer}
						</p>
					</div>
				</div>
				<div
					className="absolute right-4 top-[1.512rem] flex h-[2.375rem] w-[2.375rem]  items-center justify-center"
					onClick={handleCalendarClose}
				>
					<Cancel />
				</div>
				<div className="mx-4 mt-[0.875rem] flex h-auto w-[22.563rem] items-center justify-center rounded border border-black-300 bg-white">
					<DayPicker
						id="test"
						mode="range"
						defaultMonth={START_DATE}
						selected={range}
						onSelect={setRange}
						locale={ko}
					/>
				</div>
				<button
					className="mx-4 mt-6 h-[3.25rem] w-[22.563rem] rounded bg-tekhelet text-center text-base font-bold text-white"
					onClick={fetchOrder}
				>
					적용하기
				</button>
			</div>
		</>
	);
};

export default CalendarModal;
