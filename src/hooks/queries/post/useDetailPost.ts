import useAxios from "@/hooks/useAxios";
import { userRoleState } from "@/states/userRoleState";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const useDetailPost = (replacePostDate: (postRegisterDate: string) => void) => {
	const userRole = useRecoilValue(userRoleState);
	const { channelId, postId } = useParams();
	const { axiosData } = useAxios();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const getPostDetailData = async () => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/${userRole}s/api/v1/channels/${channelId}/posts/${postId}`,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				replacePostDate(response.data.data.date);
				return response.data.data;
			}

			if (status === 404) {
				alert("존재하지 않는 게시글입니다.");
				queryClient.cancelQueries({
					queryKey: ["detailPost", channelId, postId],
				});
				navigate(`/${channelId}/post`);
			}
		}
	};

	return useQuery({
		queryKey: ["detailPost", channelId, postId],
		queryFn: getPostDetailData,
	});
};

export default useDetailPost;
