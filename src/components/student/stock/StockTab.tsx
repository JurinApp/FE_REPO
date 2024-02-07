import { ITabs } from "@/pages/student/stock/StockPage";
import { useState } from "react";
import StockSpecContainer from "./detail/StockSpecContainer";
import StockBuyContainer from "./buy/StockBuyContainer";
import StockSellContainer from "./sell/StockSellContainer";
import StockOrderContainer from "./order/StockOrderContainer";

interface StockTabProps {
	readonly tabs: ITabs[];
}
interface ITabComponents {
	readonly [key: string]: JSX.Element;
}
const SAMPLE_STOCK = {
	stockInfo: {
		name: "선생님의 몸무게",
		price: 700,
		tax: "0.3%",
		basis: "가나다",
		detail: "라마바사",
	},
	stock_price_history: [
		{ day: "일", date: 14, price: 100 },
		{ day: "월", date: 15, price: 200 },
		{ day: "화", date: 16, price: 300 },
		{ day: "수", date: 17, price: 400 },
		{ day: "목", date: 18, price: 600 },
		{ day: "금", date: 19, price: 1800 },
		{ day: "토", date: 20, price: 600 },
		{ day: "일", date: 21, price: 300 },
	],
	stock_BS_history: {
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
const StockTab = ({ tabs }: StockTabProps) => {
	const [selectedTab, setSelectedTab] = useState(
		localStorage.getItem("selectedTab") || "spec",
	);
	const clickTabHandler = (tab: ITabs) => {
		setSelectedTab(tab.key);
		localStorage.setItem("selectedTab", tab.key);
	};
	const tabComponents: ITabComponents = {
		spec: (
			<StockSpecContainer
				stockInfo={SAMPLE_STOCK.stockInfo}
				stock_price_history={SAMPLE_STOCK.stock_price_history}
			/>
		),
		buy: (
			<StockBuyContainer
				stockBuyProps={SAMPLE_STOCK.stock_BS_history}
				stockPrice={SAMPLE_STOCK.stockInfo.price}
			/>
		),
		sell: (
			<StockSellContainer
				stockSellProps={SAMPLE_STOCK.stock_BS_history}
				stockPrice={SAMPLE_STOCK.stockInfo.price}
			/>
		),
		order: <StockOrderContainer />,
	};
	const renderTab = () => {
		return tabComponents[selectedTab];
	};
	return (
		<>
			<div className="mx-auto grid w-full grid-cols-4 bg-white sm:w-[24.536rem]">
				{tabs.map((tab) => (
					<div
						key={tab.key}
						className={`flex h-[3.563rem] items-center justify-center text-lg ${
							selectedTab === tab.key
								? "border-b-2 border-black-800 font-bold"
								: "text-black-700"
						}`}
						onClick={() => clickTabHandler(tab)}
					>
						{tab.name}
					</div>
				))}
			</div>
			{renderTab()}
		</>
	);
};

export default StockTab;
