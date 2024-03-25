import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useMyPoint = () => {
	const { channelId } = useParams();
	const { axiosData } = useAxios();

	const getMyPoint = async () => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/students/api/v1/channels/${channelId}`,
		});

		return response?.data.data.point;
	};

	const { data, isLoading } = useQuery({
		queryKey: [channelId, "myPoint"],
		queryFn: getMyPoint,
	});

	return { data, isLoading };
};

export default useMyPoint;
