import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

interface ISubmitData {
	readonly name: string;
	readonly purchasePrice: string;
	readonly tax: string;
	readonly standard: string;
	readonly content: string;
}

const useEditStock = () => {
	const queryClient = useQueryClient();
	const { channelId, stockId } = useParams();
	const { axiosData } = useAxios();
	const navigate = useNavigate();

	const editStockData = async (submitData: ISubmitData) => {
		const response = await axiosData("useToken", {
			method: "PUT",
			url: `/teachers/api/v1/channels/${channelId}/stocks/${stockId}`,
			data: submitData,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				alert("수정이 완료되었습니다.");
				queryClient.removeQueries({
					queryKey: ["editDetailStock", channelId, stockId],
				});
				queryClient.invalidateQueries({
					queryKey: ["detailStock", channelId, stockId],
				});
				queryClient.invalidateQueries({
					queryKey: ["stocks", channelId],
				});
				navigate(`/${channelId}/trade/stock/detail/${stockId}`);
			}

			if (status === 500) {
				alert("서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
			}
		}
	};

	return useMutation({
		mutationKey: ["editStock"],
		mutationFn: editStockData,
	});
};

export default useEditStock;
