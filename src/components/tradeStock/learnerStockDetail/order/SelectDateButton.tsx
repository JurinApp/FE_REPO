import { IOrderExecutionDate } from "@/interface/stock";
import { calendarModalState } from "@/states/modalState/confirmModalState";
import Calendar from "@assets/svg/calendar.svg?react";
import { format } from "date-fns";
import { useMemo } from "react";
import { useSetRecoilState } from "recoil";

interface SelectDateButton {
	readonly date: IOrderExecutionDate;
}

const SelectDateButton = ({ date }: SelectDateButton) => {
	const setIsCalendarModalState = useSetRecoilState(calendarModalState);

	const dateTitle = useMemo(() => {
		const startDate = new Date(date.startDate);
		const endDate = new Date(date.endDate);

		const title =
			date.startDate === date.endDate
				? `${format(startDate, "yyyy. MM. dd")}`
				: startDate.getFullYear() === endDate.getFullYear()
					? `${format(startDate, "yyyy. MM. dd")} – ${format(
							endDate,
							" MM. dd",
						)}`
					: `${format(startDate, "yyyy. MM. dd")} – ${format(
							endDate,
							"yyyy. MM. dd",
						)}`;

		return title;
	}, [date]);

	const handleCalendarOpen = () => {
		setIsCalendarModalState(true);
	};

	return (
		<div className="flex justify-center">
			<button
				id="calendar-modal-btn"
				onClick={handleCalendarOpen}
				className="mt-6 flex h-[2.375rem] min-w-[8.188rem] flex-row items-center justify-center gap-2 rounded border border-black-300 bg-white px-4"
			>
				<Calendar />
				<p className="text-sm font-bold">{dateTitle}</p>
			</button>
		</div>
	);
};

export default SelectDateButton;
