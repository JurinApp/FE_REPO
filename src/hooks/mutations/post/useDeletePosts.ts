import useAxios from "@/hooks/useAxios";
import { deletePostsModalState } from "@/states/modalState/confirmModalState";
import { selectedPostsState } from "@/states/selectedState/selectedPostState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

const useDeletePosts = () => {
	const [selectedPosts, setSelectedPosts] = useRecoilState(selectedPostsState);
	const setIsOpenModal = useSetRecoilState(deletePostsModalState);
	const { channelId } = useParams();
	const { axiosData } = useAxios();
	const queryClient = useQueryClient();

	const deletePosts = async () => {
		const response = await axiosData("useToken", {
			method: "DELETE",
			url: `/teachers/api/v1/channels/${channelId}/posts`,
			data: {
				postIds: selectedPosts,
			},
		});

		if (response) {
			const status = response.status;

			if (status === 204) {
				alert("삭제가 완료되었습니다.");
				queryClient.invalidateQueries({ queryKey: ["posts", channelId] });
				setSelectedPosts([]);
				setIsOpenModal(false);
			}
		}
	};

	return useMutation({
		mutationKey: ["deletePosts"],
		mutationFn: deletePosts,
	});
};

export default useDeletePosts;
