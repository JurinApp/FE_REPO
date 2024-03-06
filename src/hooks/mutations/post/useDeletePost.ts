import useAxios from "@/hooks/useAxios";
import { deleteDetailPostModalState } from "@/states/modalState/confirmModalState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";

const useDeletePost = () => {
	const setIsOpenModal = useSetRecoilState(deleteDetailPostModalState);
	const { axiosData } = useAxios();
	const { channelId, postId } = useParams();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const deletePost = async () => {
		const response = await axiosData("useToken", {
			method: "DELETE",
			url: `/teachers/api/v1/channels/${channelId}/posts/${postId}`,
		});

		if (response) {
			const status = response.status;

			if (status === 204) {
				setIsOpenModal(false);
				alert("게시글 삭제가 되었습니다.");
				queryClient.removeQueries({
					queryKey: ["detailPost", channelId, postId],
				});
				navigate(`/${channelId}/post`);
			}
		}
	};

	return useMutation({
		mutationKey: ["deletePost"],
		mutationFn: deletePost,
	});
};

export default useDeletePost;
