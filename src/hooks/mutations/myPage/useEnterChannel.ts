import { IIsError } from "@/components/myPage/channel/EnterChannelModal";
import useAxios from "@/hooks/useAxios";
import { enterChannelModalState } from "@/states/modalState/confirmModalState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

const useEnterChannel = (
	setIsError: ({ error, errorMsg }: IIsError) => void,
) => {
	const setIsEnterChannelModalOpen = useSetRecoilState(enterChannelModalState);
	const queryClient = useQueryClient();
	const { axiosData } = useAxios();

	const enterChannel = async (code: string) => {
		console.log(code);
		const response = await axiosData("useToken", {
			method: "POST",
			url: "/students/api/v1/channels",
			data: {
				entryCode: code,
			},
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				queryClient.invalidateQueries({ queryKey: ["userinfo"] });
				queryClient.invalidateQueries({ queryKey: ["channelInfo"] });
				setIsEnterChannelModalOpen(false);
			}

			if (status === 404) {
				setIsError({ error: true, errorMsg: "유효하지 않은 채널 코드입니다." });
			}
		}
	};

	return useMutation({
		mutationFn: enterChannel,
	});
};

export default useEnterChannel;
