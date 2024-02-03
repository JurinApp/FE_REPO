import { userRoleState } from "@/states/userRoleState";
import DeletePostsModal from "./DeletePostsModal";
import DeleteRegisterButton from "./DeleteRegisterButton";
import PostHeadingAndTitle from "./PostHeadingAndTitle";
import PostList from "./PostList";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";

const POST_LIST = [
	{
		postId: "1",
		postTitle: "선생님 몸무게",
		postContent: "이번주 (12/23 ~ 25) 주말 계획",
		postRegDate: "12/27 (수)",
	},
	{
		postId: "2",
		postTitle: "선생님 몸무게",
		postContent: "이번주 (12/23 ~ 25) 주말 계획",
		postRegDate: "12/27 (수)",
	},
	{
		postId: "3",
		postTitle: "선생님 몸무게",
		postContent: "이번주 (12/23 ~ 25) 주말 계획",
		postRegDate: "12/27 (수)",
	},
	{
		postId: "4",
		postTitle: "선생님 몸무게",
		postContent: "이번주 (12/23 ~ 25) 주말 계획",
		postRegDate: "12/27 (수)",
	},
];

const PostContainer = () => {
	const userRole = useRecoilValue(userRoleState);

	useEffect(() => {
		console.log(userRole);
	}, [userRole]);

	return (
		<div className="relative mx-auto h-body-height w-full bg-btn-cancel-tekhelet px-4 sm:w-[24.563rem]">
			<PostHeadingAndTitle postList={POST_LIST} />
			<PostList postList={POST_LIST} />
			<DeleteRegisterButton />
			<DeletePostsModal />
		</div>
	);
};

export default PostContainer;