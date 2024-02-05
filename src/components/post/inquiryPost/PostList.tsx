import { IPost } from "@/interface/post";
import {
	allCheckPostsState,
	selectedPostsState,
} from "@/states/selectedPostState";
import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import PostItem from "./PostItem";
import { userRoleState } from "@/states/userRoleState";

interface IPostListProps {
	readonly postList: IPost[];
}

const PostList = ({ postList }: IPostListProps) => {
	const selectedPosts = useRecoilValue(selectedPostsState);
	const resetSelectedPosts = useResetRecoilState(selectedPostsState);
	const setIsAllCheck = useSetRecoilState(allCheckPostsState);
	const userRole = useRecoilValue(userRoleState);

	useEffect(() => {
		if (selectedPosts.length === postList.length) {
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
			}`}
		>
			{postList.map((post: IPost) => (
				<PostItem post={post} key={post.postId} />
			))}
		</div>
	);
};

export default PostList;
