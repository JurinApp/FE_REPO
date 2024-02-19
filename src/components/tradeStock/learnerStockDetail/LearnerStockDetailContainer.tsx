import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import StockTab from "./StockTab";
import { useRecoilValue } from "recoil";
import { selectedStockTabState } from "@/states/selectedStockTabState";
import StockSpecContainer from "./spec/StockSpecContainer";
import StockBuyContainer from "./buy/StockBuyContainer";
import StockSellContainer from "./sell/StockSellContainer";
import StockOrderContainer from "./order/StockOrderContainer";
import useAxios from "@/hooks/useAxios";
import { useQueries } from "@tanstack/react-query";
import { IStockSpecData } from "@/interface/stock";

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
	const { axiosData } = useAxios();

	const channelId = location.pathname.split("/")[1];
	const stockId = location.pathname.split("/")[3];

	// 상세 주식 내용 조회
	const fetchStockSpec = async () => {
		const apiUrl = `/students/api/v1/channels/${channelId}/stocks/${stockId}`;
		const response = await axiosData("useToken", {
			method: "GET",
			url: apiUrl,
		});
		if (response) {
			const status = response.status;
			if (status === 200) {
				return response.data.data;
			}
		}
	};
	// 보유 주식 목록 조회 (나의 주식 메뉴 눌렀을 때, 사용될 데이터)
	// const fetchMyStockList = async () => {
	// 	const apiUrl = `/students/api/v1/channels/${channelId}/stocks/mine`;
	// 	const response = await axiosData("useToken", {
	// 		method: "GET",
	// 		url: apiUrl,
	// 	});
	// 	if (response) {
	// 		const status = response.status;
	// 		if (status === 200) {
	// 			return response.data.data;
	// 		}
	// 	}
	// };

	// 학생 주식 종목 상세 거래 정보 조회 (매수, 매도 페이지)
	const fetchTradeHistory = async () => {
		const apiUrl = `/students/api/v1/channels/${channelId}/stocks/${stockId}/trades`;
		const response = await axiosData("useToken", {
			method: "GET",
			url: apiUrl,
		});
		if (response) {
			const status = response.status;
			if (status === 200) {
				return response.data.data;
			}
		}
	};

	// 학생 보유 주식 상세 조회
	const fetchUserStock = async () => {
		const apiUrl = `/students/api/v1/channels/${channelId}/stocks/${stockId}/mine`;
		const response = await axiosData("useToken", {
			method: "GET",
			url: apiUrl,
		});
		if (response) {
			const status = response.status;
			if (status === 200) {
				return response.data.data;
			}
		}
	};

	const fetchQuery = useQueries({
		queries: [
			{
				queryKey: ["stockSpec", channelId, stockId],
				queryFn: fetchStockSpec,
			},
			{
				queryKey: ["tradeHistory", channelId, stockId],
				queryFn: fetchTradeHistory,
			},
			{
				queryKey: ["userStock", stockId],
				queryFn: fetchUserStock,
			},
		],
	});
	const stockSpec: IStockSpecData = fetchQuery[0]?.data?.stock;
	const priceHistory = fetchQuery[0]?.data?.dailyPrice;
	const userPoint = fetchQuery[2]?.data?.user.point;
	console.log(userPoint);
	console.log(stockSpec, priceHistory);
	const isLoading = fetchQuery.some((query) => query.isLoading);
	return (
		<>
			<GoBackButton name={SAMPLE_STOCK.stockInfo.name} />
			<StockTab />
			{selectedTab === "spec" && !isLoading && (
				<StockSpecContainer
					stockSpec={stockSpec}
					stockPriceHistory={priceHistory}
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
			{selectedTab === "order" && (
				<StockOrderContainer channelId={channelId} stockId={stockId} />
			)}
		</>
	);
};

export default LearnerStockDetailContainer;
