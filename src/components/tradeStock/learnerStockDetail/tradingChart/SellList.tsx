import { IStockTransaction } from "@/interface/stock";

interface ISellListProps {
	readonly sellList: IStockTransaction[];
}

const SellList = ({ sellList }: ISellListProps) => {
	return (
		<ul className="grid grow grid-cols-1 grid-rows-7 border-t border-black-300 bg-stock-red">
			{sellList.length === 0 ? (
				<p className="px-2 text-xs">거래된 내역이 없습니다.</p>
			) : (
				sellList.reverse().map((transaction, index) => {
					if (index < 7) {
						return (
							<li
								key={index}
								className={`flex flex-grow items-center justify-between 
                ${index !== 6 && "border-b border-black-300"} px-2 font-medium`}
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

export default SellList;
