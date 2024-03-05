import { IStockTransaction } from "@/interface/stock";

interface IBuyListProps {
	readonly buyList: IStockTransaction[];
}

const BuyList = ({ buyList }: IBuyListProps) => {
	return (
		<ul
			className={`${
				buyList.length === 0
					? "flex items-center justify-center"
					: "grid grid-cols-1 grid-rows-7"
			} grow bg-stock-blue`}
		>
			{buyList.length === 0 ? (
				<p className="px-2 text-xs">거래된 내역이 없습니다.</p>
			) : (
				buyList.reverse().map((transaction, index) => {
					if (index < 7) {
						return (
							<li
								key={index}
								className={`flex flex-grow items-center justify-between px-2 font-medium ${
									index !== 6 && "border-b border-black-300"
								}`}
							>
								<p>
									{transaction.price}
									<span>P</span>
								</p>
								<p className="text-black-800">{transaction.amount}</p>
							</li>
						);
					} else {
						return null;
					}
				})
			)}
		</ul>
	);
};

export default BuyList;
