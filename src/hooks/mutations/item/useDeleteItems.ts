import useAxios from "@/hooks/useAxios";
import { deleteItemsModalState } from "@/states/modalState/confirmModalState";
import { selectedItemState } from "@/states/selectedState/selectedItemState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

const useDeleteItems = () => {
	const [selectedItems, setSelectedItems] = useRecoilState(selectedItemState);
	const setIsOpenModal = useSetRecoilState(deleteItemsModalState);
	const { axiosData } = useAxios();
	const { channelId } = useParams();
	const queryClient = useQueryClient();

	const deleteItemsData = async () => {
		const response = await axiosData("useToken", {
			method: "DELETE",
			url: `/teachers/api/v1/channels/${channelId}/items`,
			data: {
				itemIds: selectedItems,
			},
		});

		if (response) {
			const status = response.status;

			if (status === 204) {
				alert("삭제가 완료되었습니다.");
				queryClient.invalidateQueries({ queryKey: ["items", channelId] });
				setSelectedItems([]);
				setIsOpenModal(false);
			}
		}
	};

	return useMutation({
		mutationKey: ["deleteItems"],
		mutationFn: deleteItemsData,
	});
};

export default useDeleteItems;
