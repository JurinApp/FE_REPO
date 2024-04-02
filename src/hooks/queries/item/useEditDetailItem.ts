import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useEditDetailItem = () => {
	const { channelId, itemId } = useParams();
	const { axiosData } = useAxios();

	const getDetailItemData = async () => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/teachers/api/v1/channels/${channelId}/items/${itemId}`,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				return response.data.data;
			}
		}
	};

	return useQuery({
		queryKey: ["editDetailItem", channelId, itemId],
		queryFn: getDetailItemData,
	});
};

export default useEditDetailItem;
