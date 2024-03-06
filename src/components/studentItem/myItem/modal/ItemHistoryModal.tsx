import Spinner from "@/components/common/spinner/Spinner";
import useMyItemHistory from "@/hooks/queries/useMyItemHistory";
import { itemHistoryModalState } from "@/states/modalState/confirmModalState";
import { studentSelectedItem } from "@/states/studentItem/studentSelectedItem";
import Cancel from "@assets/svg/cancel.svg?react";
import { useRecoilState, useRecoilValue } from "recoil";
import MyItemHistoryList from "./MyItemHistoryList";

export interface IUserItemLog {
	readonly amount: number;
	readonly date: string;
}

const ItemHistoryModal = () => {
	const selectedMyItem = useRecoilValue(studentSelectedItem);
	const { data, isLoading } = useMyItemHistory(selectedMyItem?.id);
	const [isItemHistoryModalOpen, setIsItemHistoryModalOpen] = useRecoilState(
		itemHistoryModalState,
	);

	const handleModalClose = () => {
		setIsItemHistoryModalOpen(false);
	};

	return (
		<>
			<div
				className={`${
					isItemHistoryModalOpen ? "absolute" : "hidden"
				} left-0 right-0 top-0 z-[1000] mx-auto mr-auto h-inTrade-height w-full bg-calender-back sm:w-[24.536rem]`}
			>
				{isLoading ? (
					<Spinner />
				) : (
					<div>
						<div className="flex flex-row items-center justify-center">
							<p className="mt-[2.063rem] truncate text-base font-bold">
								{selectedMyItem?.title}
							</p>
						</div>
						<MyItemHistoryList historyList={data.userItemLogs} />
						<button
							type="button"
							className="absolute right-4 top-[1.512rem] flex h-[2.375rem] w-[2.375rem]  items-center justify-center"
							onClick={handleModalClose}
						>
							<Cancel />
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default ItemHistoryModal;
