import Spinner from "@/components/common/spinner/Spinner";
import useAxios from "@/hooks/useAxios";
import { useIntersectionObserver } from "@/hooks/useObserver";
import { IPostResponseData } from "@/interface/post";
import { userRoleState } from "@/states/userRoleState";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import DeletePostsModal from "./DeletePostsModal";
import DeleteRegisterButton from "./DeleteRegisterButton";
import PostHeadingAndTitle from "./PostHeadingAndTitle";
import PostList from "./PostList";

interface IInfinityQueryData {
	readonly pageParams: number[];
	readonly pages: IPostResponseData[];
}

const PostContainer = () => {
	const userRole = useRecoilValue(userRoleState);
	const { channelId } = useParams();
	const { axiosData } = useAxios();

	const handleInquiryPost = async (param: number) => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/${userRole}s/api/v1/channels/${channelId}/posts?limit=15&offset=${param}`,
		});

		return response?.data.data;
	};

	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
		useInfiniteQuery<IPostResponseData, Error, IInfinityQueryData>({
			queryKey: ["posts", channelId],
			queryFn: ({ pageParam }) => handleInquiryPost(pageParam as number),
			initialPageParam: 0,
			getNextPageParam: (lastPage) => {
				return lastPage.next !== null ? lastPage.offset + 15 : undefined;
			},
		});

	const observeTargetRef = useIntersectionObserver({
		hasNextPage,
		fetchNextPage,
	});

	return (
		<div className="relative mx-auto h-body-height w-full bg-btn-cancel-tekhelet px-4 sm:w-[24.563rem]">
			{isLoading || !data ? (
				<Spinner />
			) : (
				<>
					<PostHeadingAndTitle responseData={data.pages} />
					<PostList
						responseData={data.pages}
						isFetching={isFetching}
						observeTargetRef={observeTargetRef}
					/>
					<DeleteRegisterButton />
					<DeletePostsModal />
				</>
			)}
		</div>
	);
};

export default PostContainer;
