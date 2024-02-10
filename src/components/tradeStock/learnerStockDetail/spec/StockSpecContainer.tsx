import StockPriceChart from "./StockPriceChart";
import StockSpecSection from "./StockSpecSection";

export interface IStockSpecProps {
	readonly stockInfo: {
		readonly name: string;
		readonly price: number;
		readonly tax: string;
		readonly basis: string;
		readonly detail: string;
	};
	readonly stockPriceHistory: {
		readonly day: string;
		readonly date: number;
		readonly price: number;
	}[];
}
const StockSpecContainer = ({
	stockInfo,
	stockPriceHistory,
}: IStockSpecProps) => {
	return (
		<>
			<div className="relative mx-auto h-inTrade-height w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				<StockSpecSection stockInfo={stockInfo} />
				<section id="stock-chart" className="mx-4 mt-6">
					<StockPriceChart stockData={stockPriceHistory} />
				</section>
			</div>
		</>
	);
};

export default StockSpecContainer;
