import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useBuyStock = (stockCount: number) => {
	const { axiosData } = useAxios();
	const { channelId, stockId } = useParams();
	const queryClient = useQueryClient();

	const buyStock = async () => {
		const apiUrl = `/students/api/v1/channels/${channelId}/stocks/${stockId}`;
		const response = await axiosData("useToken", {
			method: "POST",
			url: apiUrl,
			data: {
				tradeType: 1,
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
		mutationFn: () => buyStock(),
		onSuccess: () => {
			alert("매수가 완료되었습니다.");
			queryClient.invalidateQueries({ queryKey: ["tradeStockDetail"] });
		},
	});
};

export default useBuyStock;
