import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useStockInfoAndHistory = () => {
	const { channelId, stockId } = useParams();
	const { axiosData } = useAxios();

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

	return useQuery({
		queryKey: ["stockSpec", stockId],
		queryFn: getStockInfoAndTradeHistory,
	});
};

export default useStockInfoAndHistory;
