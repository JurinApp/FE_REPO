import useAxios from "@/hooks/useAxios";
import { deleteDetailTradeStockModalState } from "@/states/modalState/confirmModalState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";

const useDeleteStock = () => {
	const setIsOpenModal = useSetRecoilState(deleteDetailTradeStockModalState);
	const { channelId, stockId } = useParams();
	const { axiosData } = useAxios();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const deleteStockData = async () => {
		const response = await axiosData("useToken", {
			method: "DELETE",
			url: `/teachers/api/v1/channels/${channelId}/stocks/${stockId}`,
		});

		if (response) {
			const status = response.status;

			if (status === 204) {
				alert("삭제가 완료되었습니다.");
				queryClient.invalidateQueries({ queryKey: ["stocks", channelId] });
				queryClient.removeQueries({
					queryKey: ["detailStock", channelId, stockId],
				});
				navigate(`/${channelId}/trade/home`);
			}

			if (status === 400) {
				alert("주식 거래 시간에는 삭제가 불가능합니다.");
			}

			if (status === 500) {
				alert("서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
			}

			setIsOpenModal(false);
		}
	};

	return useMutation({
		mutationKey: ["deleteStock"],
		mutationFn: deleteStockData,
	});
};

export default useDeleteStock;
