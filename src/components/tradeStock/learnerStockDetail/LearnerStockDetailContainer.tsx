import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import Spinner from "@/components/common/spinner/Spinner";
import useStockTradeInfoAndHistory from "@/hooks/queries/useStockTradeInfoAndHistory";
import { selectedStockTabState } from "@/states/selectedTabState/selectedStockTabState";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import StockTab from "./StockTab";
import BuyStockContainer from "./buy/BuyStockContainer";
import StockDescriptionContainer from "./description/StockDescriptionContainer";
import StockOrderContainer from "./order/StockOrderContainer";
import SellStockContainer from "./sell/StockSellContainer";

const SAMPLE = [
	{
		tradeDate: "2024-03-03",
		price: 3000,
		volume: 0,
		transactionAmount: 2,
	},
	{
		tradeDate: "2024-03-04",
		price: 1200,
		volume: 0,
		transactionAmount: 3,
	},
	{
		tradeDate: "2024-03-05",
		price: 1000,
		volume: 0,
		transactionAmount: 4,
	},
	{
		tradeDate: "2024-03-06",
		price: 3000,
		volume: 0,
		transactionAmount: 2,
	},
	{
		tradeDate: "2024-03-07",
		price: 1500,
		volume: 0,
		transactionAmount: 2,
	},
	{
		tradeDate: "2024-03-08",
		price: 6000,
		volume: 0,
		transactionAmount: 4,
	},
	{
		tradeDate: "2024-03-09",
		price: 1000,
		volume: 0,
		transactionAmount: 2,
	},
];

const SAMPLE_STOCK = {
	stockInfo: {
		name: "선생님의 몸무게",
		price: 700,
		tax: "0.3%",
		basis: "가나다",
		detail: "라마바사",
	},
	stockPriceHistory: [
		{ day: "일", date: 14, price: 500 },
		{ day: "월", date: 15, price: 200 },
		{ day: "화", date: 16, price: 300 },
		{ day: "수", date: 17, price: 400 },
		{ day: "목", date: 18, price: 600 },
		{ day: "금", date: 19, price: 1800 },
		{ day: "토", date: 20, price: 600 },
		{ day: "일", date: 21, price: 300 },
	],
	stockBSHistory: {
		sellList: [
			{ tradeDate: "2024-03-03", price: 4900, amount: 7 },
			{ tradeDate: "2024-03-03", price: 4200, amount: 6 },
			{ tradeDate: "2024-03-03", price: 3500, amount: 5 },
			{ tradeDate: "2024-03-03", price: 2800, amount: 4 },
			{ tradeDate: "2024-03-03", price: 2100, amount: 3 },
			{ tradeDate: "2024-03-03", price: 1400, amount: 2 },
			{ tradeDate: "2024-03-03", price: 700, amount: 1 },
		],
		buyList: [
			{ tradeDate: "2024-03-03", price: 700, amount: 1 },
			{ tradeDate: "2024-03-03", price: 1400, amount: 2 },
			{ tradeDate: "2024-03-03", price: 2100, amount: 3 },
			{ tradeDate: "2024-03-03", price: 2800, amount: 4 },
			{ tradeDate: "2024-03-03", price: 3500, amount: 5 },
			{ tradeDate: "2024-03-03", price: 4200, amount: 6 },
			{ tradeDate: "2024-03-03", price: 4900, amount: 7 },
		],
	},
};

const LearnerStockDetailContainer = () => {
	const selectedTab = useRecoilValue(selectedStockTabState);
	const { channelId } = useParams();
	const queries = useStockTradeInfoAndHistory();

	return (
		<>
			{queries[0].isLoading ? (
				<Spinner />
			) : (
				<>
					<GoBackButton
						name={queries[0].data.stock.name}
						backNavigationPath={`/${channelId}/trade/home`}
					/>
					<StockTab />
					{selectedTab === "spec" && (
						<StockDescriptionContainer
							stockInfo={queries[0].data.stock}
							isLoading={queries[0].isLoading}
							stockPriceHistory={SAMPLE}
						/>
					)}
					{selectedTab === "buy" && (
						<BuyStockContainer
							userPointInfo={queries[2].data.user}
							stockPriceInfo={queries[0].data.stock}
							stockBSHistory={SAMPLE_STOCK.stockBSHistory}
						/>
					)}
					{selectedTab === "sell" && (
						<SellStockContainer
							userPointInfo={queries[2].data.user}
							stockPriceInfo={queries[0].data.stock}
							stockBSHistory={SAMPLE_STOCK.stockBSHistory}
						/>
					)}
					{selectedTab === "order" && <StockOrderContainer />}
				</>
			)}
		</>
	);
};

export default LearnerStockDetailContainer;
