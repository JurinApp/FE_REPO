import { IPost, IPostResponseData } from "@/interface/post";
import {
	allCheckPostsState,
	selectedPostsState,
} from "@/states/selectedPostState";
import { RefObject, useEffect } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import PostItem from "./PostItem";
import { userRoleState } from "@/states/userRoleState";
import ObserveTarget from "@/components/common/observer/ObserveTarget";
import IntersectSpinner from "@/components/common/spinner/IntersectSpinner";

interface IPostListProps {
	readonly responseData: IPostResponseData[];
	readonly isFetching: boolean;
	readonly observeTargetRef: RefObject<HTMLDivElement>;
}

const PostList = ({
	responseData,
	isFetching,
	observeTargetRef,
}: IPostListProps) => {
	const selectedPosts = useRecoilValue(selectedPostsState);
	const resetSelectedPosts = useResetRecoilState(selectedPostsState);
	const setIsAllCheck = useSetRecoilState(allCheckPostsState);
	const userRole = useRecoilValue(userRoleState);

	const flatMapPostList = responseData.flatMap((data) => {
		return data.results.flatMap((post) => {
			return post;
		});
	});

	const isExists = flatMapPostList.length === 0;

	useEffect(() => {
		if (selectedPosts.length === flatMapPostList.length) {
			setIsAllCheck(true);
		} else {
			setIsAllCheck(false);
		}
	}, [selectedPosts]);

	useEffect(() => {
		return () => {
			if (selectedPosts) {
				resetSelectedPosts();
			}
		};
	}, []);

	return (
		<div
			className={`h-[calc(100vh-18rem)] overflow-y-auto  ${
				userRole === "student" ? "pt-6" : "pt-2"
			} ${isExists && "flex items-center justify-center"}`}
		>
			{isExists ? (
				<p className="text-black-700">등록된 게시글이 없습니다.</p>
			) : (
				<>
					{flatMapPostList.map((post: IPost) => (
						<PostItem post={post} key={post.id} />
					))}
					{isFetching ? (
						<IntersectSpinner />
					) : (
						<ObserveTarget observeTargetRef={observeTargetRef} />
					)}
				</>
			)}
		</div>
	);
};

export default PostList;
