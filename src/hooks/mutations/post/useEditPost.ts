import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

interface ISubmitData {
	readonly mainTitle: string;
	readonly subTitle: string;
	readonly date: string;
	readonly content: string;
}

const useEditPost = () => {
	const navigate = useNavigate();
	const { channelId, postId } = useParams();
	const { axiosData } = useAxios();
	const queryClient = useQueryClient();

	const editPostData = async (submitData: ISubmitData) => {
		const response = await axiosData("useToken", {
			method: "PUT",
			url: `/teachers/api/v1/channels/${channelId}/posts/${postId}`,
			data: submitData,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				alert("수정이 완료되었습니다.");
				queryClient.invalidateQueries({ queryKey: ["posts", channelId] });
				queryClient.invalidateQueries({
					queryKey: ["posts", channelId],
				});
				navigate(`/${channelId}/post/detail/${postId}`);
			}

			if (status === 500) {
				alert("서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
			}
		}
	};

	return useMutation({
		mutationKey: ["editPost"],
		mutationFn: editPostData,
	});
};

export default useEditPost;
