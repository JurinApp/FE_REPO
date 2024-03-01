import { itemHistoryModalState } from "@/states/modalState/confirmModalState";
import Cancel from "@assets/svg/cancel.svg?react";

import { useRecoilState } from "recoil";
import { IItemLog } from "./MyItem";

interface IItemHistoryProps {
	readonly title: string;
	readonly userItemLogs: {
		readonly amount: number;
		readonly date: string;
	}[];
}
const ItemHistoryModal = ({ userItemLogs, title }: IItemHistoryProps) => {
	const [isItemHistoryModalOpen, setIsItemHistoryModalOpen] = useRecoilState(
		itemHistoryModalState,
	);
	console.log(userItemLogs);

	// const { axiosData } = useAxios();
	const handleModalClose = () => {
		setIsItemHistoryModalOpen(false);
	};
	// const [itemLog, setItemLog] = useState<IItemLog[]>([]);

	// const channelId = location.pathname.substring(1, 2);

	// const fetchUsedHistory = async () => {
	// 	const apiUrl = `/students/api/v1/channels/${channelId}/items/mine/${itemId}/logs`;
	// 	const response = await axiosData("useToken", {
	// 		method: "GET",
	// 		url: apiUrl,
	// 	});
	// 	if (response) {
	// 		const status = response.status;
	// 		if (status === 200) {
	// 			setItemLog(response.data.data.userItemLogs);
	// 		}
	// 	}
	// };

	return (
		<>
			<div
				className={`${
					isItemHistoryModalOpen ? "absolute" : "hidden"
				} left-0 right-0 top-0 z-[1000] mx-auto ml-auto mr-auto h-inTrade-height w-full bg-calender-back sm:w-[24.536rem]`}
			>
				<div className="flex flex-row items-center justify-center">
					<p className="mt-[2.063rem] text-base font-bold">{title}</p>
				</div>

				<div className="mx-4 mt-[1.438rem] flex w-[22.563rem] flex-col rounded border">
					<div className="flex h-[3.125rem] w-[22.563rem] flex-row items-center justify-around border-b border-b-gray-300 bg-white">
						<p className="text-sm font-normal text-tekhelet">사용 날짜</p>
						<p className="text-sm font-normal text-tekhelet">사용 개수</p>
					</div>
					{userItemLogs.map((item, idx) => (
						<div key={idx}>
							<div className="flex h-[3.125rem] w-[22.563rem] flex-row items-center border-b border-b-gray-300 bg-white">
								<p className="ml-[3.125rem] text-center text-sm font-normal">
									{item.date}
								</p>
								<p className="ml-[8.563rem] text-sm font-normal text-tekhelet">
									{item.amount}
								</p>
							</div>
						</div>
					))}
				</div>
				<div
					className="absolute right-4 top-[1.512rem] flex h-[2.375rem] w-[2.375rem]  items-center justify-center"
					onClick={handleModalClose}
				>
					<Cancel />
				</div>
			</div>
		</>
	);
};

export default ItemHistoryModal;
