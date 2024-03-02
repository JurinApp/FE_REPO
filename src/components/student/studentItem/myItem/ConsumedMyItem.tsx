import { MyItem } from "@/interface/item";
import { itemHistoryModalState } from "@/states/modalState/confirmModalState";
import { studentSelectedItem } from "@/states/studentItem/studentSelectedItem";
import ItemHis from "@assets/svg/itemHistory.svg?react";
import UsedItem from "@assets/svg/usedItem.svg?react";
import { useSetRecoilState } from "recoil";

interface IConsumedMyItemProps {
	readonly myItem: MyItem;
}

const ConsumedMyItem = ({ myItem }: IConsumedMyItemProps) => {
	const setIsItemHistoryModalOpen = useSetRecoilState(itemHistoryModalState);
	const setSelectedStudentItem = useSetRecoilState(studentSelectedItem);

	const handleItemHistoryOpenModal = () => {
		setSelectedStudentItem(myItem);
		setIsItemHistoryModalOpen(true);
	};

	return (
		<div
			onClick={handleItemHistoryOpenModal}
			className="flex h-[11.75rem] w-[7.188rem] cursor-pointer flex-col rounded border"
		>
			<div className="relative flex h-[7.188rem] w-full items-center justify-center rounded-t bg-white">
				<img
					src={myItem.imageUrl}
					alt={myItem.title}
					className="h-full w-full object-contain"
				/>
				<div className="absolute flex h-full w-full items-center justify-center">
					<UsedItem />
				</div>
			</div>
			<div className="flex h-[4.563rem] flex-col rounded-b border-t bg-white py-[0.875rem]">
				<p className="ml-[0.625rem] text-sm font-normal">{myItem.title}</p>
				<div className="ml-[0.625rem] flex h-[2.25rem] w-[5.938rem] items-center justify-between">
					<p className="text-sm text-tekhelet">사용 현황</p>
					<ItemHis />
				</div>
			</div>
		</div>
	);
};

export default ConsumedMyItem;
