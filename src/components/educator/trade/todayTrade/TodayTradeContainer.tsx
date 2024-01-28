import FilterButton from "./FilterButton";
import StockList from "./StockList";

const STOCK_LIST = [
	{
		key: "1",
		stockId: "1",
		stockName: "선생님의 몸무게",
		stockPrice: 700,
		pastStockPrice: 800,
	},
	{
		key: "2",
		stockId: "2",
		stockName: "르세라핌 - Perfect Night",
		stockPrice: 180,
		pastStockPrice: 900,
	},
	{
		key: "3",
		stockId: "3",
		stockName: "선생님의 몸무게",
		stockPrice: 700,
		pastStockPrice: 1000,
	},
	{
		key: "4",
		stockId: "4",
		stockName: "선생님의 몸무게",
		stockPrice: 700,
		pastStockPrice: 400,
	},
];

const TodayTradeContainer = () => {
	return (
		<div className="mx-auto w-full bg-btn-cancel-tekhelet px-4 sm:w-[24.536rem]">
			<FilterButton />
			<StockList stockList={STOCK_LIST} />
		</div>
	);
};

export default TodayTradeContainer;
