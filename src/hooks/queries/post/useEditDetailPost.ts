import useAxios from "@/hooks/useAxios";
import { userRoleState } from "@/states/userRoleState";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const useEditDetailPost = () => {
	const userRole = useRecoilValue(userRoleState);
	const { axiosData } = useAxios();
	const { channelId, postId } = useParams();
	const navigate = useNavigate();

	const getPostData = async () => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/${userRole}s/api/v1/channels/${channelId}/posts/${postId}`,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				return response.data.data;
			}

			if (status === 403) {
				alert(
					"해당 채널의 게시글 생성 권한이 없거나 게시글 등록 형식이 잘못되었습니다.",
				);
			}

			if (status === 404) {
				alert("존재하지 않는 게시글입니다.");
				navigate(`/${channelId}/post`);
			}
		}
	};

	return useQuery({
		queryKey: ["detailPost", channelId, postId],
		queryFn: getPostData,
	});
};

export default useEditDetailPost;
