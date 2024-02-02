interface IItemProps {
	readonly itemId: string;
	readonly itemName: string;
	readonly price: number;
}

const Item = ({ itemId, itemName, price }: IItemProps) => {
	// 상품을 누르면 모달의 상태 변화가 발생해서 구매 모달창이 표시.
	return (
		<>
			<div className="flex h-[11.75rem] w-[7.188rem] flex-col ">
				<div
					id="item-img"
					className="h-[7.188rem] w-[7.188rem] rounded border bg-gray-400"
				>
					상품이미지
				</div>
				<div
					id="item-info"
					className="flex h-[4.563rem] flex-col bg-white py-[0.875rem] pl-[0.625rem]"
				>
					<p className="text-sm font-normal">{itemName}</p>
					<p className="text-base font-medium">{price} P</p>
				</div>
			</div>
		</>
	);
};

export default Item;
