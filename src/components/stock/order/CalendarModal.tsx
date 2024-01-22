import Calandar from "@assets/svg/calendar.svg?react";
import Cancel from "@assets/svg/cancel.svg?react";

interface ICalendarModalProps {
	onCancel: () => void;
	fetchOrder: () => void;
}

const DAY = ["월", "화", "수", "목", "금", "토", "일"];
const CalendarModal = (props: ICalendarModalProps) => {
	return (
		<>
			<div className="bg-calender-back absolute left-0 right-0 top-[6.512rem] z-[1000] mx-auto ml-auto mr-auto h-inTrade-height w-full sm:w-[24.536rem]">
				<div className="flex flex-row items-center justify-center">
					<div
						id="calendar-modal-btn"
						className="mt-6 flex h-[38px] w-auto flex-row items-center justify-center gap-2 rounded border border-black-300 bg-white px-[14px]"
					>
						<Calandar />
						<p className="text-sm font-bold">2024. 01. 23 - 01. 30</p>
					</div>
				</div>
				<div
					className="absolute right-4 top-[1.512rem] flex h-[38px] w-[38px]  items-center justify-center"
					onClick={props.onCancel}
				>
					<Cancel />
				</div>
				<div
					id="calendar"
					className="mx-4 mt-[14px] flex h-[340px] w-[361px] flex-col bg-white"
				>
					<div
						id="day"
						className="flex flex-row justify-center gap-[29px] border-b border-b-black-100 px-12"
					>
						{DAY.map((day, idx) => (
							<span
								key={idx}
								className={`my-4 text-sm font-normal ${
									day === "토"
										? "text-blur-blue"
										: day === "일"
											? "text-blur-red"
											: "text-black-300"
								}`}
							>
								{day}
							</span>
						))}
					</div>
					<div id="calendar-space" className="mx-[46px] mt-[30px]">
						<p className="text-base font-medium">1월</p>
						<div>달력 들어갈 부분</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CalendarModal;
