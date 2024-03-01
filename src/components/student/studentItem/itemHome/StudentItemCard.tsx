import { IStudentItem } from "@/interface/item";
import { itemBuyModalState } from "@/states/modalState/confirmModalState";
import { studentSelectedItem } from "@/states/studentSelectedItem";
import { useSetRecoilState } from "recoil";

interface IStudentItemCardProps {
	readonly item: IStudentItem;
}

const StudentItemCard = ({ item }: IStudentItemCardProps) => {
	const setIsItemBuyModalOpen = useSetRecoilState(itemBuyModalState);
	const setSelectedItem = useSetRecoilState(studentSelectedItem);

	const handleModalOpen = () => {
		if (item.amount === 0) return;
		setSelectedItem(item);
		setIsItemBuyModalOpen(true);
	};

	return (
		<div
			onClick={handleModalOpen}
			className="flex h-[11.75rem] w-[7.188rem] cursor-pointer flex-col rounded-[0.25rem] border-black-100"
		>
			<div
				id="item-img"
				className="h-[7.188rem] w-[7.188rem] rounded border bg-gray-400"
			>
				<img
					src={item.imageUrl}
					alt={item.title}
					className="h-full w-full object-cover"
				/>
			</div>
			{item.amount !== 0 ? (
				<div className="flex h-[4.563rem] flex-col bg-white px-[0.625rem] py-[0.875rem]">
					<p className="truncate pb-1 text-sm font-normal">{item.title}</p>
					<div className="flex">
						<p className="truncate font-medium">{item.price}</p>
						<p className="pl-1">P</p>
					</div>
				</div>
			) : (
				<div className="flex h-[4.563rem] items-center justify-center bg-white">
					<p className="text-center font-medium">품절</p>
				</div>
			)}
		</div>
	);
};

export default StudentItemCard;
