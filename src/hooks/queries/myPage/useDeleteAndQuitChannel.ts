import useAxios from "@/hooks/useAxios";
import { quitChannelModalState } from "@/states/modalState/confirmModalState";
import { userRoleState } from "@/states/userRoleState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const useDeleteAndQuitChannel = () => {
	const userRole = useRecoilValue(userRoleState);
	const setIsQuitChannelModalOpen = useSetRecoilState(quitChannelModalState);
	const { axiosData } = useAxios();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const deleteAndQuitChannel = async (channelId: number) => {
		await axiosData("useToken", {
			method: "DELETE",
			url: `${userRole}s/api/v1/channels/${channelId}`,
		});
	};

	return useMutation({
		mutationFn: deleteAndQuitChannel,
		onSuccess: () => {
			alert("완료되었습니다.");
			queryClient.invalidateQueries({ queryKey: ["userinfo"] });
			queryClient.invalidateQueries({ queryKey: ["channelInfo"] });
			navigate("/mypage");
		},
		onError: () => {
			alert("처리가 되지 않았습니다. 잠시 후에 다시 시도해주세요.");
		},
		onSettled: () => {
			setIsQuitChannelModalOpen(false);
		},
	});
};

export default useDeleteAndQuitChannel;
