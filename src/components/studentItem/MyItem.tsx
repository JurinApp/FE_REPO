interface IMyItemProps {
	itemId: string;
	itemName: string;
	quantity: number;
}

const MyItem = (props: IMyItemProps) => {
	const { itemId, itemName, quantity } = props;

	return (
		<>
			<div
				className="flex h-[188px] w-[115px] flex-col rounded border"
				key={itemId}
			>
				<div id="item-img" className="h-[115px] w-[115px] bg-gray-400">
					상품이미지
				</div>
				<div
					id="item-info"
					className="flex h-[73px] flex-col bg-white py-[14px]"
				>
					<p className="ml-[10px] text-sm font-normal">{itemName}</p>
					{quantity !== 0 ? (
						<p className="ml-[10px] text-base font-medium">{quantity} 개</p>
					) : (
						<button className="ml-[10px] h-[36px] w-[95px] rounded border bg-tekhelet text-center text-white">
							사용 현황
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default MyItem;
