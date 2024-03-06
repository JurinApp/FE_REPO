import useAxios from "@/hooks/useAxios";
import { deleteConfirmModalState } from "@/states/modalState/confirmModalState";
import { selectedLearner } from "@/states/selectedState/selectedLearnerState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

const useDeleteLearner = () => {
	const queryClient = useQueryClient();
	const [selectedLearners, setSelectedLearners] =
		useRecoilState(selectedLearner);
	const setIsOpenModal = useSetRecoilState(deleteConfirmModalState);
	const { axiosData } = useAxios();
	const { channelId } = useParams();

	const deleteLearners = async () => {
		const response = await axiosData("useToken", {
			method: "DELETE",
			url: `/teachers/api/v1/channels/${channelId}/management`,
			data: {
				userIds: selectedLearners,
			},
		});

		if (response) {
			const status = response.status;

			if (status === 204) {
				alert("학생 삭제가 되었습니다.");
				queryClient.invalidateQueries({
					queryKey: ["learnerList", channelId],
				});
				setSelectedLearners([]);
				setIsOpenModal(false);
			}

			if (status === 404) {
				alert(
					"채널에 해당 학생이 존재하지 않습니다. 잠시 후에 다시 시도해주세요.",
				);
			}

			if (status === 500) {
				alert("서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
			}
		}
	};

	return useMutation({
		mutationKey: ["deleteLearner", channelId],
		mutationFn: deleteLearners,
	});
};

export default useDeleteLearner;
