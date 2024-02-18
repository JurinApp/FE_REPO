import { itemHistoryModalState } from "@/states/modalState/confirmModalState";
import Cancel from "@assets/svg/cancel.svg?react";
import { useRecoilState } from "recoil";

interface ItemHistoryModalProps {
	readonly itemName: string;
	readonly itemId: string;
}

const ITEM_HISTORY = [
	{ date: "12/25(월)", count: 1 },
	{ date: "12/26(화)", count: 2 },
	{ date: "12/27(수)", count: 1 },
];

const ItemHistoryModal = (props: ItemHistoryModalProps) => {
	const [isItemHistoryModalOpen, setIsItemHistoryModalOpen] = useRecoilState(
		itemHistoryModalState,
	);
	const { itemName } = props;

	const handleModalClose = () => {
		setIsItemHistoryModalOpen(false);
	};
	// const fetchItemHistory = (itemId: number) => {
	// 	// TODO: 아이템 사용 내역을 조회할 수 있는 API
	// 	console.log("조회가 완료되었습니다.");
	// };
	return (
		<>
			<div
				className={`${
					isItemHistoryModalOpen ? "absolute" : "hidden"
				} left-0 right-0 top-0 z-[1000] mx-auto ml-auto mr-auto h-inTrade-height w-full bg-calender-back sm:w-[24.536rem]`}
			>
				<div className="flex flex-row items-center justify-center">
					<p className="mt-[2.063rem] text-base font-bold">{itemName}</p>
				</div>

				<div className="mx-4 mt-[1.438rem] flex w-[22.563rem] flex-col rounded border">
					<div className="flex h-[3.125rem] w-[22.563rem] flex-row items-center justify-around border-b border-b-gray-300 bg-white">
						<p className="text-sm font-normal text-tekhelet">사용 날짜</p>
						<p className="text-sm font-normal text-tekhelet">사용 개수</p>
					</div>
					{ITEM_HISTORY.map((item, idx) => (
						<div key={idx}>
							<div className="flex h-[3.125rem] w-[22.563rem] flex-row items-center justify-around border-b border-b-gray-300 bg-white">
								<p className="text-sm font-normal text-tekhelet">{item.date}</p>
								<p className="text-sm font-normal text-tekhelet">
									{item.count}
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
