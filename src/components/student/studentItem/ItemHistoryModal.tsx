import Cancel from "@assets/svg/cancel.svg?react";

interface ItemHistoryModalProps {
	onCancel: () => void;
	itemName: string;
	itemId: string;
}

const ITEM_HISTORY = [
	{ date: "12/25(월)", count: 1 },
	{ date: "12/26(화)", count: 2 },
	{ date: "12/27(수)", count: 1 },
];

const ItemHistoryModal = (props: ItemHistoryModalProps) => {
	const { onCancel, itemName, itemId } = props;

	const fetchItemHistory = (itemId: number) => {
		// TODO: 아이템 사용 내역을 조회할 수 있는 API
		console.log("조회가 완료되었습니다.");
	};
	return (
		<>
			<div className="absolute left-0 right-0 top-0 z-[1000] mx-auto ml-auto mr-auto h-inTrade-height w-full bg-calender-back sm:w-[24.536rem]">
				<div className="flex flex-row items-center justify-center">
					<p className="mt-[33px] text-base font-bold">{itemName}</p>
				</div>

				<div className="mx-4 mt-[23px] flex w-[361px] flex-col rounded border">
					<div className="flex h-[50px] w-[361px] flex-row items-center justify-around border-b border-b-gray-300 bg-white">
						<p className="text-sm font-normal text-tekhelet">사용 날짜</p>
						<p className="text-sm font-normal text-tekhelet">사용 개수</p>
					</div>
					{ITEM_HISTORY.map((item, index) => (
						<>
							<div
								key={index}
								className="flex h-[50px] w-[361px] flex-row items-center justify-around border-b border-b-gray-300 bg-white"
							>
								<p className="text-sm font-normal text-tekhelet">{item.date}</p>
								<p className="text-sm font-normal text-tekhelet">
									{item.count}
								</p>
							</div>
						</>
					))}
				</div>

				<div
					className="absolute right-4 top-[1.512rem] flex h-[38px] w-[38px]  items-center justify-center"
					onClick={props.onCancel}
				>
					<Cancel />
				</div>
			</div>
		</>
	);
};

export default ItemHistoryModal;
