import { IAvailableItem, IUsedItem } from "@/interface/item";
import { itemUseModalState } from "@/states/modalState/confirmModalState";
import { studentSelectedItem } from "@/states/studentItem/studentSelectedItem";
import { useSetRecoilState } from "recoil";

interface IMyItemProps {
	readonly myItem: IUsedItem | IAvailableItem;
}

const MyItem = ({ myItem }: IMyItemProps) => {
	const setIsItemUseModalOpen = useSetRecoilState(itemUseModalState);
	const setSelectedMyItem = useSetRecoilState(studentSelectedItem);

	const handleModalOpen = () => {
		setSelectedMyItem(myItem);
		setIsItemUseModalOpen(true);
	};

	return (
		<div
			onClick={handleModalOpen}
			className="flex h-[11.75rem] w-[7.188rem] cursor-pointer flex-col rounded border"
		>
			<div className="flex h-[7.188rem] w-full items-center justify-center rounded-t bg-white">
				<img
					src={myItem.imageUrl}
					alt="아이템 이미지"
					className="w-full object-contain"
				/>
			</div>
			<div className="flex h-[4.563rem] flex-col rounded-b border-t bg-white py-[0.875rem]">
				<p className="ml-[0.625rem] text-sm font-normal">{myItem.title}</p>
				<p className="ml-[0.625rem] text-sm font-medium">
					<span className="text-black-800">사용 가능 : </span>
					{myItem.remainingAmount} 개
				</p>
			</div>
		</div>
	);
};

export default MyItem;
