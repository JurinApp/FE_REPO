import useAxios from "@/hooks/useAxios";
import { itemUseModalState } from "@/states/modalState/confirmModalState";
import { studentSelectedItem } from "@/states/studentItem/studentSelectedItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const useItemUse = () => {
	const selectedMyItem = useRecoilValue(studentSelectedItem);
	const setIsItemUseModalOpen = useSetRecoilState(itemUseModalState);
	const { channelId } = useParams();
	const { axiosData } = useAxios();
	const queryClient = useQueryClient();

	const useItem = async () => {
		const response = await axiosData("useToken", {
			method: "POST",
			url: `/students/api/v1/channels/${channelId}/items/mine/${selectedMyItem?.id}`,
			data: {
				amount: 1,
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
		mutationFn: useItem,
		onSuccess: () => {
			alert(`${selectedMyItem?.title}아이템 사용이 되었습니다.`);
			queryClient.invalidateQueries({
				queryKey: ["studentItem", "myItem"],
			});
			setIsItemUseModalOpen(false);
		},
	});
};

export default useItemUse;
