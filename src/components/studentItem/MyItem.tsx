import UsedItem from "@assets/svg/usedItem.svg?react";
import ItemHis from "@assets/svg/itemHistory.svg?react";
import { useState } from "react";
import ItemHistoryModal from "./ItemHistoryModal";

interface IMyItemProps {
	itemId: string;
	itemName: string;
	quantity: number;
}

const MyItem = (props: IMyItemProps) => {
	const { itemId, itemName, quantity } = props;
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<div
				className="relative flex h-[188px] w-[115px] flex-col rounded border"
				key={itemId}
			>
				<div id="item-img" className="h-[115px] w-[115px] bg-gray-400">
					{quantity !== 0 ? (
						<>상품이미지</>
					) : (
						<div className="flex h-[115px] w-[115px] items-center justify-center">
							<UsedItem />
						</div>
					)}
				</div>
				<div
					id="item-info"
					className="flex h-[73px] flex-col bg-white py-[14px]"
				>
					<p className="ml-[10px] text-sm font-normal">{itemName}</p>
					{quantity !== 0 ? (
						<p className="ml-[10px] text-base font-medium">{quantity} 개</p>
					) : (
						<button
							onClick={handleOpenModal}
							className="ml-[10px] flex h-[36px] w-[95px] flex-row items-center justify-between text-tekhelet"
						>
							<p>사용 현황</p>
							<ItemHis />
						</button>
					)}
				</div>
			</div>
			{isModalOpen && (
				<ItemHistoryModal
					onCancel={handleCloseModal}
					itemName={itemName}
					itemId={itemId}
				/>
			)}
		</>
	);
};

export default MyItem;
