import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useSellStock = (stockCount: number) => {
	const { axiosData } = useAxios();
	const { channelId, stockId } = useParams();
	const queryClient = useQueryClient();

	const sellStock = async () => {
		const apiUrl = `/students/api/v1/channels/${channelId}/stocks/${stockId}`;
		const response = await axiosData("useToken", {
			method: "POST",
			url: apiUrl,
			data: {
				tradeType: 2,
				amount: stockCount,
			},
		});
		if (response) {
			const status = response.status;
			if (status === 200) {
				return response.data.data;
			}
		}
	};

	return useMutation({
		mutationFn: sellStock,
		onSuccess: () => {
			alert("매도가 완료되었습니다.");
			queryClient.invalidateQueries({ queryKey: ["tradeStockDetail"] });
		},
	});
};

export default useSellStock;
