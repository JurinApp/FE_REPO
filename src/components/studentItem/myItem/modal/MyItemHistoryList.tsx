import { IUserItemLog } from "./ItemHistoryModal";

interface IMyItemHistoryListProps {
	readonly historyList: IUserItemLog[];
}

const MyItemHistoryList = ({ historyList }: IMyItemHistoryListProps) => {
	return (
		<div className="data mx-4 mt-[1.438rem] flex w-[22.563rem] flex-col">
			<div className="flex h-[3.125rem] w-[22.563rem] flex-row items-center justify-around rounded-t bg-white">
				<p className="text-sm font-normal text-tekhelet">사용 날짜</p>
				<p className="text-sm font-normal text-tekhelet">사용 개수</p>
			</div>
			{historyList.map((item: IUserItemLog, idx: number) => (
				<div
					key={item.date + idx}
					className={`flex h-[3.125rem] w-[22.563rem] flex-row items-center border-t bg-white ${
						historyList.length === idx + 1 && "rounded-b"
					}`}
				>
					<p className="ml-[3.125rem] text-center text-sm font-normal">
						{item.date}
					</p>
					<p className="ml-[8.563rem] text-sm font-normal text-tekhelet">
						{item.amount}
					</p>
				</div>
			))}
		</div>
	);
};

export default MyItemHistoryList;
