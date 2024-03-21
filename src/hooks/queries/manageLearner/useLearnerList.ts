import useAxios from "@/hooks/useAxios";
import { searchKeyword } from "@/states/searchKeyword";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const useLearnerList = () => {
	const keyword = useRecoilValue(searchKeyword);
	const { axiosData } = useAxios();
	const { channelId } = useParams();

	const getLearnersData = async () => {
		const apiUrl =
			keyword.length === 0
				? `/teachers/api/v1/channels/${channelId}/management`
				: `/teachers/api/v1/channels/1/management?nickname=${keyword}`;

		const response = await axiosData("useToken", {
			method: "GET",
			url: apiUrl,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				return response.data.data.users;
			}
		}
	};

	return useQuery({
		queryKey: ["learnerList", channelId, keyword],
		queryFn: getLearnersData,
	});
};

export default useLearnerList;
