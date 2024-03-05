import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface createChannelData {
	channelName: string;
}

const useCreateChannel = () => {
	const { axiosData } = useAxios();
	const queryClient = useQueryClient();

	const createChannel = async (submitData: createChannelData) => {
		const apiUrl = "/teachers/api/v1/channels";
		const response = await axiosData("useToken", {
			method: "POST",
			url: apiUrl,
			data: submitData,
		});
		if (response) {
			const status = response.status;
			if (status === 200) {
				return response.data.data;
			}
		}
	};

	return useMutation({
		mutationFn: createChannel,
		onSuccess: () => {
			alert("채널 생성이 완료 되었습니다.");
			queryClient.invalidateQueries({ queryKey: ["channelInfo"] });
		},
		onError: () => {
			alert("채널 생성이 되지 않았습니다. 잠시 후에 다시 시도해주세요.");
		},
	});
};

export default useCreateChannel;
