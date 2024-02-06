import { IPost } from "@/interface/post";
import {
	allCheckPostsState,
	selectedPostsState,
} from "@/states/selectedPostState";
import { userRoleState } from "@/states/userRoleState";
import { ChangeEvent, useEffect, useRef } from "react";
import {
	useRecoilState,
	useRecoilValue,
	useResetRecoilState,
	useSetRecoilState,
} from "recoil";

interface IPostHeadingAndTitleProps {
	readonly postList: IPost[];
}

const PostHeadingAndTitle = ({ postList }: IPostHeadingAndTitleProps) => {
	const setSelectedPosts = useSetRecoilState(selectedPostsState);
	const [isAllCheck, setIsAllCheck] = useRecoilState(allCheckPostsState);
	const resetIsAllCheck = useResetRecoilState(allCheckPostsState);
	const userRole = useRecoilValue(userRoleState);
	const checkBoxRef = useRef<HTMLInputElement>(null);

	const clickAllCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const isCheck = e.target.checked;

		if (isCheck) {
			const learnerIdArr = postList.map((post) => post.id);

			setSelectedPosts(learnerIdArr);
			setIsAllCheck(true);
		} else {
			setSelectedPosts([]);
			setIsAllCheck(false);
		}
	};

	useEffect(() => {
		return () => {
			if (isAllCheck) {
				resetIsAllCheck();
			}
		};
	}, []);

	return (
		<div
			className={`
      ${userRole === "student" ? "hidden" : "flex"}
       h-12 w-full items-center justify-between pt-[0.625rem] text-black-800`}
		>
			<div className="flex items-center">
				<input
					ref={checkBoxRef}
					type="checkbox"
					id="checkAll"
					className="custom-checkBox cursor-pointer"
					checked={isAllCheck}
					onChange={clickAllCheckHandler}
				/>
				<label
					htmlFor="checkAll"
					className="ml-2 flex h-full cursor-pointer items-center text-sm"
				>
					전체 선택
				</label>
			</div>
			<h1 className="font-bold">
				게시글 <span>({postList.length})</span>
			</h1>
		</div>
	);
};

export default PostHeadingAndTitle;
