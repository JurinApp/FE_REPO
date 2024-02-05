import DeleteRegisterButton from "./DeleteRegisterButton";
import DeleteStocksModal from "./DeleteStocksModal";
import TradeHomeHeading from "./TradeHomeHeading";
import TradeStockList from "./TradeStockList";

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

const TradeHomeContainer = () => {
	return (
		<div className="relative mx-auto h-[calc(100vh-10.7rem)] w-full bg-btn-cancel-tekhelet px-4 sm:w-[24.563rem]">
			<TradeHomeHeading stockList={STOCK_LIST} />
			<TradeStockList stockList={STOCK_LIST} />
			<DeleteRegisterButton />
			<DeleteStocksModal />
		</div>
	);
};

export default TradeHomeContainer;
