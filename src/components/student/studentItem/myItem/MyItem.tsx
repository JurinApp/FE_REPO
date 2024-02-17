import UsedItem from "@assets/svg/usedItem.svg?react";
import ItemHis from "@assets/svg/itemHistory.svg?react";
import ItemHistoryModal from "./ItemHistoryModal";
import { useSetRecoilState } from "recoil";
import { itemHistoryModalState } from "@/states/confirmModalState";

interface IMyItemProps {
	readonly itemId: number;
	readonly itemName: string;
	readonly quantity: number;
}

const MyItem = (props: IMyItemProps) => {
	const { itemId, itemName, quantity } = props;
	const setIsItemHistoryModalOpen = useSetRecoilState(itemHistoryModalState);
	const handleModalOpen = (e: React.MouseEvent) => {
		e.stopPropagation();
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
						<>상품이미지</>
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
			{quantity === 0 && (
				<ItemHistoryModal itemName={itemName} itemId={itemId} />
			)}
		</>
	);
};

export default MyItem;
