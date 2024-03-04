import { IStockBSHistory } from "@/interface/stock";

interface ITradingChartProps {
	readonly stockBSHistory: IStockBSHistory;
}

const TradingChart = ({ stockBSHistory }: ITradingChartProps) => {
	return (
		<>
			<div className="flex h-inTrade-height w-[7.688rem] flex-col">
				<ul className="flex flex-grow flex-col">
					{stockBSHistory.buyList.map((transaction, index) => (
						<li
							key={index}
							className={`flex flex-grow items-center justify-between bg-stock-blue px-2 font-medium ${
								index !== 0 && "border-t border-black-300"
							}`}
						>
							<p>
								{transaction.price}
								<span>P</span>
							</p>
							<p className="text-black-800">{transaction.amount}</p>
						</li>
					))}
				</ul>
				<ul className="flex flex-grow flex-col">
					{stockBSHistory.sellList.map((transaction, index) => (
						<li
							key={index}
							className="flex flex-grow items-center justify-between border-t border-black-300 bg-stock-red px-2 font-medium"
						>
							<p>
								{transaction.price}
								<span>P</span>
							</p>
							<p className="text-black-800">{transaction.amount}</p>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default TradingChart;
