import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

interface ISubmitData {
	readonly mainTitle: string;
	readonly subTitle: string;
	readonly date: string;
	readonly content: string;
}

const useRegisterPost = () => {
	const navigate = useNavigate();
	const { channelId } = useParams();
	const { axiosData } = useAxios();
	const queryClient = useQueryClient();

	const registerPostData = async (submitData: ISubmitData) => {
		const response = await axiosData("useToken", {
			method: "POST",
			url: `/teachers/api/v1/channels/${channelId}/posts`,
			data: submitData,
		});

		if (response) {
			const status = response.status;

			if (status === 201) {
				alert("게시글 등록이 완료 되었습니다.");
				queryClient.invalidateQueries({ queryKey: ["posts", channelId] });
				navigate(`/${channelId}/post`);
			}

			if (status === 403) {
				alert(
					"해당 채널의 게시글 생성 권한이 없거나 게시글 등록 형식이 잘못되었습니다.",
				);
			}
		}
	};

	return useMutation({
		mutationKey: ["registerPost"],
		mutationFn: registerPostData,
	});
};

export default useRegisterPost;
