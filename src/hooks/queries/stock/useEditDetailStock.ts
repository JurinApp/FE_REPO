import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const useEditDetailStock = () => {
	const { channelId, stockId } = useParams();
	const { axiosData } = useAxios();
	const navigate = useNavigate();

	const getDetailStockData = async () => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/teachers/api/v1/channels/${channelId}/stocks/${stockId}`,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				const stockData = response.data.data;
				return stockData;
			}

			if (status === 404) {
				alert("존재하지 않는 주식거래 상품입니다.");
				navigate(`/${channelId}/trade/home`);
			}
		}
	};

	return useQuery({
		queryKey: ["editDetailStock", channelId, stockId],
		queryFn: getDetailStockData,
	});
};

export default useEditDetailStock;
