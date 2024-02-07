import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import StockHeader from "@/components/common/header/StockHeader";
import StockTab from "@/components/student/stock/StockTab";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

export interface ITabs {
	readonly key: string;
	readonly name: string;
}
const TABS = [
	{ key: "spec", name: "설명" },
	{ key: "buy", name: "매수" },
	{ key: "sell", name: "매도" },
	{ key: "order", name: "주문체결" },
];

// type TStockId = {
// 	stockId: number;
// };

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
const StockPage = () => {
	const setIsUseHeader = useSetRecoilState(headerMenuUseState);
	// 페이지 Url이 /stock/:stockId일때,
	// const { stockId } = useParams();
	useLayoutEffect(() => {
		setIsUseHeader({
			isUseHeader: false,
			isUseMenu: true,
			isUseTab: false,
		});
	}, []);

	// const fetchStock = (stockId: TStockId) => {
	// 	// stockId로 주식 정보 조회.
	// 	console.log("조회 완료");
	// };

	return (
		<>
			<GoBackButton name={SAMPLE_STOCK.stockInfo.name} />
			<StockTab tabs={TABS} />
		</>
	);
};

export default StockPage;
