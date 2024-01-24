import { IPost } from "@/interface/post";
import {
	allCheckPostsState,
	selectedPostsState,
} from "@/states/selectedPostState";
import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import PostItem from "./PostItem";

interface IPostListProps {
	readonly postList: IPost[];
}

const PostList = ({ postList }: IPostListProps) => {
	const selectedPosts = useRecoilValue(selectedPostsState);
	const resetSelectedPosts = useResetRecoilState(selectedPostsState);
	const setIsAllCheck = useSetRecoilState(allCheckPostsState);

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
		<div className="mt-2 h-[calc(100vh-18rem)] overflow-y-auto">
			{postList.map((post: IPost) => (
				<PostItem post={post} key={post.postId} />
			))}
		</div>
	);
};

export default PostList;
