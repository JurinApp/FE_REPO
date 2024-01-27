import StockPriceChart from "./StockPriceChart";
import StockSpecSection from "./StockSpecSection";

export interface IStockSpecProps {
	stockInfo: {
		readonly name: string;
		readonly price: number;
		readonly tax: string;
		readonly basis: string;
		readonly detail: string;
	};
	stock_price_history: {
		day: string;
		date: number;
		price: number;
	}[];
}
const StockSpecContainer = ({
	stockInfo,
	stock_price_history,
}: IStockSpecProps) => {
	console.log(stockInfo, stock_price_history);

	// const setStockName = useSetRecoilState(stockNameState);

	// useEffect(() => {
	// 	setStockName(stockInfo.name);
	// }, []);
	return (
		<>
			<div className="relative mx-auto h-inTrade-height w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				<StockSpecSection stockInfo={stockInfo} />
				<section id="stock-chart" className="mx-4 mt-6">
					<StockPriceChart stockData={stock_price_history} />
				</section>
			</div>
		</>
	);
};

export default StockSpecContainer;
