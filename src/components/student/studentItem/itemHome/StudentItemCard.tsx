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
		setSelectedItem(item);
		setIsItemBuyModalOpen(true);
	};

	return (
		<div onClick={handleModalOpen} className="cursor-pointer">
			<div className="flex h-[11.75rem] w-[7.188rem] flex-col">
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
				<div
					id="item-info"
					className="flex h-[4.563rem] flex-col	items-start bg-white py-[0.875rem] pl-[0.625rem]"
				>
					{item.amount !== 0 ? (
						<>
							<p className="text-sm font-normal">{item.title}</p>
							<p className="text-base font-medium">{item.price} P</p>
						</>
					) : (
						<>
							<p className="text-base font-medium">품절</p>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default StudentItemCard;
