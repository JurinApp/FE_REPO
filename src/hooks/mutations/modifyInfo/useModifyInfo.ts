import useAxios from "@/hooks/useAxios";
import { modifyUserinfoModalState } from "@/states/modalState/confirmModalState";
import { userRoleState } from "@/states/userRoleState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface ISubmitData {
	readonly nickname: string;
	readonly schoolName: string;
	readonly channelName?: string;
}

const useModifyInfo = () => {
	const userRole = useRecoilValue(userRoleState);
	const setIsModifyUserInfoModalOpen = useSetRecoilState(
		modifyUserinfoModalState,
	);
	const { axiosData } = useAxios();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const modifyUserInfo = async (submitData: ISubmitData) => {
		const apiUrl = `/${userRole}s/api/v1/users/profile`;

		const response = await axiosData("useToken", {
			method: "PUT",
			url: apiUrl,
			data: submitData,
		});

		return response?.data.data;
	};

	return useMutation({
		mutationFn: modifyUserInfo,
		onSuccess: () => {
			alert("정보 수정이 완료 되었습니다.");
			queryClient.invalidateQueries({ queryKey: ["userinfo"] });
			queryClient.invalidateQueries({ queryKey: ["channelInfo"] });
			navigate("/mypage");
		},
		onError: () => {
			alert("정보 수정에 실패하였습니다. 잠시 후에 다시 시도해주세요.");
		},
		onSettled: () => {
			setIsModifyUserInfoModalOpen(false);
		},
	});
};

export default useModifyInfo;
