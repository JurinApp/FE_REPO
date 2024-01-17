import StockPriceChart from "./StockPriceChart";
import StockSpecSection from "./StockSpecSection";

export interface IStockSpec {
	readonly name: string;
	readonly price: number;
	readonly tax: string;
	readonly basis: string;
	readonly detail: string;
}
const StockSpecContainer = () => {
	const teacher_weight: IStockSpec = {
		name: "선생님의 몸무게",
		price: 700,
		tax: "0.3%",
		basis: "가나다",
		detail: "라마바사",
	};
	const stock_price_history = [
		{ day: "일", date: 14, price: 100 },
		{ day: "월", date: 15, price: 200 },
		{ day: "화", date: 16, price: 300 },
		{ day: "수", date: 17, price: 400 },
		{ day: "목", date: 18, price: 600 },
		{ day: "금", date: 19, price: 1800 },
		{ day: "토", date: 20, price: 600 },
		{ day: "일", date: 21, price: 300 },
	];
	return (
		<>
			<div className="h-inTrade-height relative mx-auto w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				<StockSpecSection stockSpec={teacher_weight} />
				<section id="stock-chart" className="mx-4 mt-6">
					<StockPriceChart stockData={stock_price_history} />
				</section>
			</div>
		</>
	);
};

export default StockSpecContainer;
