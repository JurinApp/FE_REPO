import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const useDeleteItem = () => {
	const { axiosData } = useAxios();
	const { channelId, itemId } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const deleteItemData = async () => {
		const response = await axiosData("useToken", {
			method: "DELETE",
			url: `/teachers/api/v1/channels/${channelId}/items/${itemId}`,
		});

		if (response) {
			const status = response.status;

			if (status === 204) {
				queryClient.removeQueries({
					queryKey: ["detailItem", channelId, itemId],
				});
				queryClient.invalidateQueries({
					queryKey: ["items", channelId],
				});
				alert("아이템 삭제가 완료되었습니다.");
				navigate(`/${channelId}/item`);
			}
		}
	};

	return useMutation({
		mutationKey: ["deleteItem"],
		mutationFn: deleteItemData,
	});
};

export default useDeleteItem;
