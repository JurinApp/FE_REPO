import { IPost } from "@/interface/post";
import { selectedPostsState } from "@/states/selectedPostState";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

interface IPostItemProps {
	readonly post: IPost;
}

const PostItem = ({ post }: IPostItemProps) => {
	const [selectedPosts, setSelectedPosts] = useRecoilState(selectedPostsState);

	const onClickPostHandler = () => {
		const index = selectedPosts.findIndex((postId) => {
			return postId === post.postId;
		});

		if (index === -1) {
			setSelectedPosts([...selectedPosts, post.postId]);
		} else {
			const deepCopySelectedPosts = [...selectedPosts];
			deepCopySelectedPosts.splice(index, 1);
			setSelectedPosts(deepCopySelectedPosts);
		}
	};

	useEffect(() => {
		return () => {
			setSelectedPosts([]);
		};
	}, []);

	return (
		<div className="mb-2 flex h-[4.5rem] w-full sm:w-[21.563rem]">
			<div className="flex items-center">
				<label className="hidden">선택</label>
				<input
					type="checkbox"
					className="h-6 w-6"
					onChange={onClickPostHandler}
					checked={selectedPosts.includes(post.postId) ? true : false}
				/>
			</div>
			<div className="ml-[0.75rem] flex w-full grow justify-between rounded-[0.25rem] border border-black-100 bg-white">
				<div className="flex flex-col justify-center">
					<p className="mb-[0.375rem] ml-[0.875rem] truncate font-bold text-black-800">
						{post.postTitle}
					</p>
					<p className="ml-[0.875rem] truncate text-sm text-black-800">
						{post.postContent}
					</p>
				</div>
				<p className="mb-[0.875rem] mr-[0.875rem] flex items-end text-sm text-black-300">
					{post.postRegDate}
				</p>
			</div>
		</div>
	);
};

export default PostItem;
