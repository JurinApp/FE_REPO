import { IStockPriceHistoryData, IStockSpecData } from "@/interface/stock";
import StockPriceChart from "./StockPriceChart";
import StockSpecSection from "./StockSpecSection";

export interface IStockSpecProps {
	readonly stockSpec: IStockSpecData;
	readonly stockPriceHistory: IStockPriceHistoryData;
}

export interface IStockInfo {
	readonly id: number;
	readonly name: string;
	readonly purchasePrice: number;
	readonly tax: number;
	readonly standard: string;
	readonly content: string;
}

const StockSpecContainer = ({
	stockSpec,
	stockPriceHistory,
}: IStockSpecProps) => {
	return (
		<>
			<div className="relative mx-auto h-inTrade-height w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				<StockSpecSection
					tax={stockSpec.tax}
					id={stockSpec.id}
					standard={stockSpec.standard}
					name={stockSpec.name}
					content={stockSpec.content}
					purchasePrice={stockSpec.purchasePrice}
				/>
				<section id="stock-chart" className="mx-4 mt-6">
					<StockPriceChart stockData={stockPriceHistory} />
				</section>
			</div>
		</>
	);
};

export default StockSpecContainer;
