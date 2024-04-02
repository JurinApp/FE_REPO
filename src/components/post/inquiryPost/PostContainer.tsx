import Spinner from "@/components/common/spinner/Spinner";
import useInquiryPostList from "@/hooks/queries/post/useInquiryPostList";
import { useIntersectionObserver } from "@/hooks/useObserver";
import DeletePostsModal from "./DeletePostsModal";
import DeleteRegisterButton from "./DeleteRegisterButton";
import PostHeadingAndTitle from "./PostHeadingAndTitle";
import PostList from "./PostList";

const PostContainer = () => {
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
		useInquiryPostList();

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
