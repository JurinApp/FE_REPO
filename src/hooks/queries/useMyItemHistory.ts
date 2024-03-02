import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxios from "../useAxios";

const useMyItemHistory = (id: number | undefined) => {
	const { channelId } = useParams();
	const { axiosData } = useAxios();

	const fetchUsedHistory = async () => {
		const apiUrl = `/students/api/v1/channels/${channelId}/items/mine/${id}/logs`;
		const response = await axiosData("useToken", {
			method: "GET",
			url: apiUrl,
		});
		if (response) {
			const status = response.status;

			if (status === 200) {
				return response.data.data;
			}
		}
	};

	return useQuery({
		queryKey: ["myItemHistory", id],
		queryFn: fetchUsedHistory,
	});
};

export default useMyItemHistory;
