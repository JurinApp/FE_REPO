import useAxios from "@/hooks/useAxios";
import { IPostResponseData } from "@/interface/post";
import { userRoleState } from "@/states/userRoleState";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

interface IInfinityQueryData {
	readonly pageParams: number[];
	readonly pages: IPostResponseData[];
}

const useInquiryPostList = () => {
	const userRole = useRecoilValue(userRoleState);
	const { channelId } = useParams();
	const { axiosData } = useAxios();
	const navigate = useNavigate();

	const handleInquiryPost = async (param: number) => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/${userRole}s/api/v1/channels/${channelId}/posts?limit=15&offset=${param}`,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				return response.data.data;
			}

			if (status === 404) {
				alert("현재 채널에 참여중이지 않습니다.");
				navigate("/mypage");
			}
		}
	};

	return useInfiniteQuery<IPostResponseData, Error, IInfinityQueryData>({
		queryKey: ["posts", channelId],
		queryFn: ({ pageParam }) => handleInquiryPost(pageParam as number),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			return lastPage.next !== null ? lastPage.offset + 15 : undefined;
		},
	});
};

export default useInquiryPostList;
