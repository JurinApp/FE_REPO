import { useParams } from "react-router-dom";
import useAxios from "../useAxios";
import { useQueries } from "@tanstack/react-query";

const useStockTradeInfoAndHistory = () => {
	const { axiosData } = useAxios();
	const { channelId, stockId } = useParams();

	// 상세 주식 내용 조회
	const getStockInfoAndTradeHistory = async () => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/students/api/v1/channels/${channelId}/stocks/${stockId}`,
		});
		if (response) {
			const status = response.status;

			if (status === 200) {
				return response.data.data;
			}
		}
	};

	// 학생 주식 종목 상세 거래 정보 조회 (매수, 매도 페이지)
	const getStockSellAndBuyHistory = async () => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/students/api/v1/channels/${channelId}/stocks/${stockId}/trades`,
		});
		if (response) {
			const status = response.status;
			if (status === 200) {
				return response.data.data;
			}
		}
	};

	// 학생 보유 주식 상세 조회
	const getStockOrderExecution = async () => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/students/api/v1/channels/${channelId}/stocks/${stockId}/mine`,
		});
		if (response) {
			const status = response.status;
			if (status === 200) {
				return response.data.data;
			}
		}
	};

	return useQueries({
		queries: [
			{
				queryKey: [
					"tradeStockDetail",
					"stockInfoAndTradeHistory",
					channelId,
					stockId,
				],
				queryFn: getStockInfoAndTradeHistory,
			},
			{
				queryKey: [
					"tradeStockDetail",
					"stockSellAndBuyHistory",
					channelId,
					stockId,
				],
				queryFn: getStockSellAndBuyHistory,
			},
			{
				queryKey: [
					"tradeStockDetail",
					"stockOrderExecution",
					channelId,
					stockId,
				],
				queryFn: getStockOrderExecution,
			},
		],
	});
};

export default useStockTradeInfoAndHistory;
