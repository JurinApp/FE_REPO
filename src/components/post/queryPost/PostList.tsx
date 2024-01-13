import { IPost } from "@/interface/post";
import PostItem from "./PostItem";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
	allCheckPostsState,
	selectedPostsState,
} from "@/states/selectedPostState";
import { useEffect } from "react";

interface IPostListProps {
	readonly postList: IPost[];
}

const PostList = ({ postList }: IPostListProps) => {
	const selectedPosts = useRecoilValue(selectedPostsState);
	const setIsAllCheck = useSetRecoilState(allCheckPostsState);

	useEffect(() => {
		if (selectedPosts.length === postList.length) {
			setIsAllCheck(true);
		} else {
			setIsAllCheck(false);
		}
	}, [selectedPosts]);

	return (
		<div className="mt-2 h-[calc(100vh-18rem)] overflow-y-auto">
			{postList.map((post: IPost) => (
				<PostItem post={post} />
			))}
		</div>
	);
};

export default PostList;
