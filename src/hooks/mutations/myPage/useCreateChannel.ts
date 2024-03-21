import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface createChannelData {
	channelName: string;
}

const useCreateChannel = () => {
	const { axiosData } = useAxios();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const createChannel = async (submitData: createChannelData) => {
		const response = await axiosData("useToken", {
			method: "POST",
			url: "/teachers/api/v1/channels",
			data: submitData,
		});
		if (response) {
			const status = response.status;
			if (status === 201) {
				const channelId = response.data.data.id;
				alert("채널 생성이 완료 되었습니다.");
				queryClient.invalidateQueries({ queryKey: ["channelInfo"] });
				navigate(`/${channelId}/trade/home`);
			}
		}
	};

	return useMutation({
		mutationFn: createChannel,
		onError: () => {
			alert("채널 생성이 되지 않았습니다. 잠시 후에 다시 시도해주세요.");
		},
	});
};

export default useCreateChannel;
