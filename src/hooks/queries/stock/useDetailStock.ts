import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const useDetailStock = () => {
	const { channelId, stockId } = useParams();
	const { axiosData } = useAxios();
	const navigate = useNavigate();

	const getDetailStock = async () => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/teachers/api/v1/channels/${channelId}/stocks/${stockId}`,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				const stockData = response.data.data;
				return {
					...stockData,
					purchasePrice: stockData.purchasePrice.toLocaleString(),
				};
			}

			if (status === 404) {
				alert("존재하지 않는 주식거래 상품입니다.");
				navigate(`/${channelId}/trade/home`);
			}
		}
	};

	return useQuery({
		queryKey: ["detailStock", channelId, stockId],
		queryFn: getDetailStock,
	});
};

export default useDetailStock;
