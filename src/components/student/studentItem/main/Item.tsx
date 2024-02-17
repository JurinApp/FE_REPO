interface IItemProps {
	readonly id: string;
	readonly title: string;
	readonly imageUrl: string;
	readonly price: number;
	readonly amount: number;
}

const Item = ({ id, title, imageUrl, price, amount }: IItemProps) => {
	// 상품을 누르면 모달의 상태 변화가 발생해서 구매 모달창이 표시.

	return (
		<>
			<div className="flex h-[11.75rem] w-[7.188rem] flex-col">
				<div
					id="item-img"
					className="h-[7.188rem] w-[7.188rem] rounded border bg-gray-400"
				>
					<img
						src={imageUrl}
						alt={title}
						className="h-full w-full object-cover"
					/>
				</div>
				<div
					id="item-info"
					className="flex h-[4.563rem] flex-col	items-start bg-white py-[0.875rem] pl-[0.625rem]"
				>
					{amount !== 0 ? (
						<>
							<p className="text-sm font-normal">{title}</p>
							<p className="text-base font-medium">{price} P</p>
						</>
					) : (
						<>
							<p className="text-base font-medium">품절</p>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default Item;
