import { deletePostsModalState } from "@/states/confirmModalState";
import { selectedPostsState } from "@/states/selectedPostState";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const DeleteRegisterButton = () => {
	const selectedPosts = useRecoilValue(selectedPostsState);
	const setIsOpenDeletePostsModal = useSetRecoilState(deletePostsModalState);

	const deletePostsHandler = () => {
		setIsOpenDeletePostsModal(true);
	};

	return (
		<div className="absolute bottom-6 flex w-[90%] sm:w-[22.563rem]">
			<button
				type="button"
				disabled={selectedPosts.length === 0 ? true : false}
				className="mr-1 h-box-height grow rounded border border-danger bg-white font-bold text-danger disabled:border-black-300 disabled:bg-black-100 disabled:text-black-300 "
				onClick={deletePostsHandler}
			>
				삭제
			</button>
			<Link
				to="/post/register"
				className="ml-1 flex h-box-height grow items-center justify-center rounded bg-tekhelet font-bold text-white"
			>
				등록
			</Link>
		</div>
	);
};

export default DeleteRegisterButton;
