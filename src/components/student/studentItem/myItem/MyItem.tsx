import UsedItem from "@assets/svg/usedItem.svg?react";
import ItemHis from "@assets/svg/itemHistory.svg?react";
import ItemHistoryModal from "./ItemHistoryModal";
import { useSetRecoilState } from "recoil";
import { itemHistoryModalState } from "@/states/confirmModalState";
import useAxios from "@/hooks/useAxios";
import { useState } from "react";

interface IMyItemProps {
	readonly itemId: number;
	readonly itemName: string;
	readonly quantity: number;
	readonly imageUrl: string;
}

export interface IItemLog {
	readonly title: string;
	readonly userItemLogs: {
		readonly amount: number;
		readonly date: string;
	}[];
}

const MyItem = (props: IMyItemProps) => {
	const { itemId, itemName, quantity, imageUrl } = props;
	const [itemLog, setItemLog] = useState<IItemLog | undefined>(undefined);
	const channelId = location.pathname.substring(1, 2);
	const { axiosData } = useAxios();

	const fetchUsedHistory = async () => {
		const apiUrl = `/students/api/v1/channels/${channelId}/items/mine/${itemId}/logs`;
		const response = await axiosData("useToken", {
			method: "GET",
			url: apiUrl,
		});
		if (response) {
			const status = response.status;
			if (status === 200) {
				setItemLog(response.data.data);
			}
		}
	};
	const setIsItemHistoryModalOpen = useSetRecoilState(itemHistoryModalState);
	const handleModalOpen = (e: React.MouseEvent) => {
		e.stopPropagation();
		fetchUsedHistory();
		setIsItemHistoryModalOpen(true);
	};
	return (
		<>
			<div
				className="relative flex h-[11.75rem] w-[7.188rem] flex-col rounded border"
				key={itemId}
			>
				<div id="item-img" className="h-[7.188rem] w-[7.188rem] bg-gray-400">
					{quantity !== 0 ? (
						<img
							src={imageUrl}
							alt={itemName}
							className="h-full w-full object-cover"
						/>
					) : (
						<div className="flex h-[7.188rem] w-[7.188rem] items-center justify-center">
							<UsedItem />
						</div>
					)}
				</div>
				<div
					id="item-info"
					className="flex h-[4.563rem] flex-col bg-white py-[0.875rem]"
				>
					<p className="ml-[0.625rem] text-sm font-normal">{itemName}</p>
					{quantity !== 0 ? (
						<p className="ml-[0.625rem] text-base font-medium">{quantity} 개</p>
					) : (
						<button
							onClick={handleModalOpen}
							className="ml-[0.625rem] flex h-[2.25rem] w-[5.938rem] flex-row items-center justify-between text-tekhelet"
						>
							<p>사용 현황</p>
							<ItemHis />
						</button>
					)}
				</div>
			</div>
			<ItemHistoryModal
				title={itemLog?.title ?? ""}
				userItemLogs={itemLog?.userItemLogs ?? []}
			/>
		</>
	);
};

export default MyItem;
