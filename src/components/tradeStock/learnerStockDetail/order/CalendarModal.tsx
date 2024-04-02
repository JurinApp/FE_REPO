import "@/dayPicker.css";
import { calendarModalState } from "@/states/modalState/confirmModalState";
import { changeFormDateFormat } from "@/utils/changeDateFormat";
import Calendar from "@assets/svg/calendar.svg?react";
import Cancel from "@assets/svg/cancel.svg?react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/src/style.css";
import { useRecoilState } from "recoil";

interface ICalendarModalProps {
	readonly todayDate: string;
	readonly setDate: ({ startDate, endDate }: { [key: string]: string }) => void;
}

const CalendarModal = ({ todayDate, setDate }: ICalendarModalProps) => {
	const [isCalendarModalState, setIsCalendarModalState] =
		useRecoilState(calendarModalState);
	const [range, setRange] = useState<DateRange | undefined>({
		from: new Date(todayDate),
		to: new Date(todayDate),
	});

	const rangeDateTitle = useMemo(() => {
		let title = "날짜를 선택해주세요.";

		if (range?.from) {
			title = `${format(range.from, "yyyy. MM. dd")} -`;
		}

		if (range?.from && range?.to) {
			range?.from.getFullYear() === range?.to.getFullYear()
				? (title = `${format(range.from, "yyyy. MM. dd")} – ${format(
						range.to,
						" MM. dd",
					)}`)
				: (title = `${format(range.from, "yyyy. MM. dd")} – ${format(
						range.to,
						"yyyy. MM. dd",
					)}`);
		}

		return title;
	}, [range]);

	const handleCalendarClose = () => {
		setIsCalendarModalState(false);
	};

	const handleApplyDateRange = () => {
		if (!range?.from || !range?.to) {
			alert(
				!range?.from ? "시작날짜를 선택해주세요." : "종료날짜를 선택해주세요.",
			);
			return;
		}

		const stringDate = Object.values({ ...range }).map((element) => {
			return changeFormDateFormat(element);
		});

		setDate({
			startDate: stringDate[0],
			endDate: stringDate[1],
		});
		setIsCalendarModalState(false);
	};

	useEffect(() => {
		return () => {
			setIsCalendarModalState(false);
		};
	}, []);

	return (
		<div
			className={`${
				isCalendarModalState ? "absolute" : "hidden"
			} left-0 right-0 top-0 z-[1000] mx-auto ml-auto mr-auto h-inTrade-height w-full bg-calender-back sm:w-[24.536rem]`}
		>
			<div className="flex flex-row items-center justify-center">
				<div className="mt-6 flex h-[2.375rem] w-auto flex-row items-center justify-center gap-2 rounded border border-black-300 bg-white px-[0.875rem]">
					<Calendar />
					<p id="range" className="text-sm font-bold">
						{rangeDateTitle}
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
					mode="range"
					defaultMonth={new Date(todayDate)}
					selected={range}
					onSelect={setRange}
					locale={ko}
				/>
			</div>
			<button
				type="button"
				onClick={handleApplyDateRange}
				className="mx-4 mt-6 h-[3.25rem] w-[22.563rem] rounded bg-tekhelet text-center text-base font-bold text-white"
			>
				적용하기
			</button>
		</div>
	);
};

export default CalendarModal;
