import { IStockBSHistory } from "@/interface/stock";

interface ITradingChartProps {
	readonly stockBSHistory: IStockBSHistory;
}

const TradingChart = ({ stockBSHistory }: ITradingChartProps) => {
	return (
		<>
			<div
				id="price-history"
				className="flex h-inTrade-height w-[7.688rem] flex-col"
			>
				<div id="buy" className="flex flex-grow flex-col">
					{stockBSHistory.buy.map((transaction, index) => (
						<div
							key={index}
							className={`flex flex-grow items-center justify-between bg-stock-blue px-2 ${
								index !== 0 ? "border-t border-black-300" : ""
							}`}
						>
							<span>{transaction.price}</span>
							<span>{transaction.quantity}</span>
						</div>
					))}
				</div>
				<div id="sell" className="flex flex-grow flex-col">
					{stockBSHistory.sell.map((transaction, index) => (
						<div
							key={index}
							className="flex flex-grow items-center justify-between border-t border-black-300 bg-stock-red px-2"
						>
							<span>{transaction.price}</span>
							<span>{transaction.quantity}</span>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default TradingChart;
