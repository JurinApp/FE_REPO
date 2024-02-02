interface IItemProps {
	readonly itemId: string;
	readonly itemName: string;
	readonly price: number;
}

const Item = ({ itemId, itemName, price }: IItemProps) => {
	// 상품을 누르면 모달의 상태 변화가 발생해서 구매 모달창이 표시.
	return (
		<>
			<div className="flex h-[188px] w-[115px] flex-col ">
				<div
					id="item-img"
					className="h-[115px] w-[115px] rounded border bg-gray-400"
				>
					상품이미지
				</div>
				<div
					id="item-info"
					className="flex h-[73px] flex-col bg-white py-[14px] pl-[10px]"
				>
					<p className="text-sm font-normal">{itemName}</p>
					<p className="text-base font-medium">{price} P</p>
				</div>
			</div>
		</>
	);
};

export default Item;
