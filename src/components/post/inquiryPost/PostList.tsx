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
	const isExists = postList.length === 0;

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
			} ${isExists && "flex items-center justify-center"}`}
		>
			{isExists ? (
				<p className="text-black-700">등록된 게시글이 없습니다.</p>
			) : (
				postList.map((post: IPost) => <PostItem post={post} key={post.id} />)
			)}
		</div>
	);
};

export default PostList;
