import useAxios from "@/hooks/useAxios";
import { itemBuyModalState } from "@/states/modalState/confirmModalState";
import { studentSelectedItem } from "@/states/studentItem/studentSelectedItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface ISubmitData {
	readonly price: number;
	readonly amount: number;
}

const useBuyItem = () => {
	const setIsItemBuyModalOpen = useSetRecoilState(itemBuyModalState);
	const item = useRecoilValue(studentSelectedItem);

	const { channelId } = useParams();
	const { axiosData } = useAxios();
	const queryClient = useQueryClient();

	const buyItem = async (submitData: ISubmitData) => {
		if (item) {
			const apiUrl = `/students/api/v1/channels/${channelId}/items/${item.id}`;
			const response = await axiosData("useToken", {
				method: "POST",
				url: apiUrl,
				data: submitData,
			});
			if (response) {
				const status = response.status;

				if (status === 200) {
					alert("구매가 완료되었습니다.");
					queryClient.invalidateQueries({ queryKey: ["items"] });
					queryClient.invalidateQueries({
						queryKey: ["studentItem", "myItem"],
					});
				}

				if (status === 400) {
					alert("포인트가 부족합니다.");
				}

				setIsItemBuyModalOpen(false);
			}
		}
	};

	return useMutation({
		mutationFn: buyItem,
	});
};

export default useBuyItem;
