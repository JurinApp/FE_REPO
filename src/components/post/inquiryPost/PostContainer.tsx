import Spinner from "@/components/common/spinner/Spinner";
import useAxios from "@/hooks/useAxios";
import { userRoleState } from "@/states/userRoleState";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import DeletePostsModal from "./DeletePostsModal";
import DeleteRegisterButton from "./DeleteRegisterButton";
import PostHeadingAndTitle from "./PostHeadingAndTitle";
import PostList from "./PostList";

const PostContainer = () => {
	const userRole = useRecoilValue(userRoleState);
	const { channelId } = useParams();
	const { axiosData } = useAxios();

	const handleInquiryPost = async () => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/${userRole}s/api/v1/channels/${channelId}/posts?limit=15`,
		});

		if (response) {
			return response.data.data.results;
		}
	};

	const { data, isLoading } = useQuery({
		queryKey: ["posts", channelId],
		queryFn: handleInquiryPost,
	});

	return (
		<div className="relative mx-auto h-body-height w-full bg-btn-cancel-tekhelet px-4 sm:w-[24.563rem]">
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<PostHeadingAndTitle postList={data} />
					<PostList postList={data} />
					<DeleteRegisterButton />
					<DeletePostsModal />
				</>
			)}
		</div>
	);
};

export default PostContainer;
