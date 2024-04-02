import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

interface ISubmitData {
	readonly name: string;
	readonly purchasePrice: string;
	readonly tax: string;
	readonly standard: number;
	readonly content: string;
}

const useRegisterStock = () => {
	const { channelId } = useParams();
	const { axiosData } = useAxios();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const registerTradeStock = async (submitData: ISubmitData) => {
		const response = await axiosData("useToken", {
			method: "POST",
			url: `/teachers/api/v1/channels/${channelId}/stocks`,
			data: submitData,
		});

		if (response) {
			const status = response.status;

			if (status === 201) {
				const stockId = response.data.data.id;

				alert("등록이 완료 되었습니다.");
				queryClient.invalidateQueries({ queryKey: ["stocks", channelId] });
				navigate(`/${channelId}/trade/stock/detail/${stockId}`);
			}

			if (status === 400) {
				alert("알맞은 형식으로 등록해주세요.");
			}

			if (status === 500) {
				alert("서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
			}
		}
	};

	return useMutation({
		mutationKey: ["registerTradeStock"],
		mutationFn: registerTradeStock,
	});
};

export default useRegisterStock;
