import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const useDetailItem = () => {
	const { channelId, itemId } = useParams();
	const { axiosData } = useAxios();
	const navigate = useNavigate();

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

			if (status === 404) {
				alert("존재하지 않는 아이템입니다.");
				navigate(`/${channelId}/item}`);
			}

			if (status === 500) {
				alert("서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
				navigate(`/${channelId}/item`);
			}
		}
	};

	return useQuery({
		queryKey: ["detailItem", channelId, itemId],
		queryFn: getDetailItemData,
	});
};

export default useDetailItem;
