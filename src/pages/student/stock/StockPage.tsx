import StockHeader from "@/components/common/header/StockHeader";
import StockBuyContainer from "@/components/stock/buy/StockBuyContainer";
import StockSpecContainer from "@/components/stock/detail/StockSpecContainer";
import StockOrderContainer from "@/components/stock/order/StockOrderContainer";
import StockSellContainer from "@/components/stock/sell/StockSellContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router";
import { useSetRecoilState } from "recoil";

interface ITabs {
	readonly key: string;
	readonly name: string;
}
const TABS = [
	{ key: "spec", name: "설명" },
	{ key: "buy", name: "매수" },
	{ key: "sell", name: "매도" },
	{ key: "order", name: "주문체결" },
];

type TStockId = {
	stockId: number;
};
const StockPage = () => {
	const setIsUseHeader = useSetRecoilState(headerMenuUseState);
	// 페이지 Url이 /stock/:stockId일때,
	const { stockId } = useParams();
	useLayoutEffect(() => {
		setIsUseHeader({
			isUseHeader: false,
			isUseMenu: true,
			isUseTab: false,
		});
	}, []);
	const fetchStock = (stockId: number) => {
		// stockId로 주식 정보 조회.
	};
	const sampleStock = {
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

	const [selectedTab, setSelectedTab] = useState(
		localStorage.getItem("selectedTab") || "spec",
	);

	const renderTab = () => {
		switch (selectedTab) {
			case "spec":
				return (
					<StockSpecContainer
						stockInfo={sampleStock.stockInfo}
						stock_price_history={sampleStock.stock_price_history}
					/>
				);
			case "buy":
				return (
					<StockBuyContainer
						stockBuyProps={sampleStock.stock_BS_history}
						stockPrice={sampleStock.stockInfo.price}
					/>
				);
			case "sell":
				return (
					<StockSellContainer
						stockSellProps={sampleStock.stock_BS_history}
						stockPrice={sampleStock.stockInfo.price}
					/>
				);
			case "order":
				return <StockOrderContainer />;
		}
	};

	const clickTabHandler = (tab: ITabs) => {
		setSelectedTab(tab.key);
		localStorage.setItem("selectedTab", tab.key);
	};
	return (
		<>
			<StockHeader name={sampleStock.stockInfo.name} />
			<div className="mx-auto grid w-full grid-cols-4 bg-white sm:w-[24.536rem]">
				{TABS.map((tab) => (
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

export default StockPage;
