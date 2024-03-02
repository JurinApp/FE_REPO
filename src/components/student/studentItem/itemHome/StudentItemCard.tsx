import { IStudentItem } from "@/interface/item";
import { itemBuyModalState } from "@/states/modalState/confirmModalState";
import { studentSelectedItem } from "@/states/studentItem/studentSelectedItem";
import { useMemo } from "react";
import { useSetRecoilState } from "recoil";

interface IStudentItemCardProps {
	readonly item: IStudentItem;
}

const StudentItemCard = ({ item }: IStudentItemCardProps) => {
	const setIsItemBuyModalOpen = useSetRecoilState(itemBuyModalState);
	const setSelectedItem = useSetRecoilState(studentSelectedItem);

	const isSoldOut = useMemo(() => {
		return item.amount === 0;
	}, [item.amount]);

	const handleModalOpen = () => {
		if (item.amount === 0) return;
		setSelectedItem(item);
		setIsItemBuyModalOpen(true);
	};

	return (
		<div
			onClick={handleModalOpen}
			className="relative mb-[0.875rem] flex h-[11.75rem] w-[7.188rem] cursor-pointer flex-col rounded-[0.25rem] border-black-100"
		>
			<div
				id="item-img"
				className="h-[7.188rem] w-[7.188rem] rounded-t bg-white"
			>
				<img
					src={item.imageUrl}
					alt={item.title}
					className="h-full w-full object-contain"
				/>
			</div>
			{isSoldOut ? (
				<div className="flex h-[4.563rem] items-center justify-center bg-white">
					<p className="text-center font-medium">품절</p>
				</div>
			) : (
				<div className="flex h-[4.563rem] flex-col rounded-b bg-white px-[0.625rem] py-[0.875rem]">
					<p className="truncate pb-1 text-sm font-normal">{item.title}</p>
					<div className="flex">
						<p className="truncate font-medium">{item.price}</p>
						<p className="pl-1">P</p>
					</div>
				</div>
			)}
			{isSoldOut && (
				<div className="absolute h-full w-full rounded bg-black-300" />
			)}
		</div>
	);
};

export default StudentItemCard;
