import { IPost } from "@/interface/post";
import { selectedPostsState } from "@/states/selectedPostState";
import { userRoleState } from "@/states/userRoleState";
import { Link, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

interface IPostItemProps {
	readonly post: IPost;
}

const PostItem = ({ post }: IPostItemProps) => {
	const [selectedPosts, setSelectedPosts] = useRecoilState(selectedPostsState);
	const userRole = useRecoilValue(userRoleState);
	const { channelId } = useParams();

	const handleCheckPost = () => {
		const index = selectedPosts.findIndex((postId) => {
			return postId === post.id;
		});

		if (index === -1) {
			setSelectedPosts([...selectedPosts, post.id]);
		} else {
			setSelectedPosts([...selectedPosts].splice(index, 1));
		}
	};

	return (
		<div className="mb-2 flex h-[4.5rem] w-full sm:w-[21.563rem]">
			<div
				className={`${userRole === "student" ? "hidden" : "flex"} items-center`}
			>
				<label className="hidden">선택</label>
				<input
					type="checkbox"
					className="custom-checkBox cursor-pointer"
					onChange={handleCheckPost}
					checked={selectedPosts.includes(post.id) ? true : false}
				/>
			</div>
			<Link
				to={`/${channelId}/post/detail/${post.id}`}
				className="ml-[0.75rem] flex w-full grow justify-between rounded-[0.25rem] border border-black-100 bg-white"
			>
				<div className="flex flex-col justify-center">
					<p className="mb-[0.375rem] ml-[0.875rem] truncate font-bold text-black-800">
						{post.mainTitle}
					</p>
					<p className="ml-[0.875rem] truncate text-sm text-black-800">
						{post.subTitle}
					</p>
				</div>
				<p className="mb-[0.875rem] mr-[0.875rem] flex items-end truncate text-sm text-black-300">
					{post.date}
				</p>
			</Link>
		</div>
	);
};

export default PostItem;
