import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import StockTab from "./StockTab";
import { useRecoilValue } from "recoil";
import { selectedStockTabState } from "@/states/selectedTabState/selectedStockTabState";
import StockSpecContainer from "./spec/StockSpecContainer";
import StockBuyContainer from "./buy/StockBuyContainer";
import StockSellContainer from "./sell/StockSellContainer";
import StockOrderContainer from "./order/StockOrderContainer";
import { useParams } from "react-router-dom";

const SAMPLE_STOCK = {
	stockInfo: {
		name: "선생님의 몸무게",
		price: 700,
		tax: "0.3%",
		basis: "가나다",
		detail: "라마바사",
	},
	stockPriceHistory: [
		{ day: "일", date: 14, price: 100 },
		{ day: "월", date: 15, price: 200 },
		{ day: "화", date: 16, price: 300 },
		{ day: "수", date: 17, price: 400 },
		{ day: "목", date: 18, price: 600 },
		{ day: "금", date: 19, price: 1800 },
		{ day: "토", date: 20, price: 600 },
		{ day: "일", date: 21, price: 300 },
	],
	stockBSHistory: {
		buy: [
			{ price: 4900, quantity: 7 },
			{ price: 4200, quantity: 6 },
			{ price: 3500, quantity: 5 },
			{ price: 2800, quantity: 4 },
			{ price: 2100, quantity: 3 },
			{ price: 1400, quantity: 2 },
			{ price: 700, quantity: 1 },
		],
		sell: [
			{ price: 700, quantity: 1 },
			{ price: 1400, quantity: 2 },
			{ price: 2100, quantity: 3 },
			{ price: 2800, quantity: 4 },
			{ price: 3500, quantity: 5 },
			{ price: 4200, quantity: 6 },
			{ price: 4900, quantity: 7 },
		],
	},
};

const LearnerStockDetailContainer = () => {
	const selectedTab = useRecoilValue(selectedStockTabState);
	const { channelId, stockId } = useParams();

	return (
		<>
			<GoBackButton
				name={SAMPLE_STOCK.stockInfo.name}
				backNavigationPath={`/${channelId}/stock/${stockId}`}
			/>
			<StockTab />
			{selectedTab === "spec" && (
				<StockSpecContainer
					stockInfo={SAMPLE_STOCK.stockInfo}
					stockPriceHistory={SAMPLE_STOCK.stockPriceHistory}
				/>
			)}
			{selectedTab === "buy" && (
				<StockBuyContainer
					stockBSHistory={SAMPLE_STOCK.stockBSHistory}
					stockPrice={SAMPLE_STOCK.stockInfo.price}
				/>
			)}
			{selectedTab === "sell" && (
				<StockSellContainer
					stockBSHistory={SAMPLE_STOCK.stockBSHistory}
					stockPrice={SAMPLE_STOCK.stockInfo.price}
				/>
			)}
			{selectedTab === "order" && <StockOrderContainer />}
		</>
	);
};

export default LearnerStockDetailContainer;
