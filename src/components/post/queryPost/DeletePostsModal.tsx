import { deletePostsModalState } from "@/states/confirmModalState";
import { selectedPostsState } from "@/states/selectedPostState";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

const DeletePostsModal = () => {
	const [selectedPosts, setSelectedPosts] = useRecoilState(selectedPostsState);
	const [isOpenDeletePostsModal, setIsOpenDeletePostsModal] = useRecoilState(
		deletePostsModalState,
	);
	const modalRef = useRef<HTMLDivElement>(null);

	const closeModalHandler = () => {
		setIsOpenDeletePostsModal(false);
	};

	const deletePostsHandler = () => {
		setSelectedPosts([]);
		setIsOpenDeletePostsModal(false);
	};

	useEffect(() => {
		const outSideClickHandler = (e: Event) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				setIsOpenDeletePostsModal(false);
			}
		};

		document.addEventListener("mousedown", outSideClickHandler);

		return () => {
			document.removeEventListener("mousedown", outSideClickHandler);
		};
	}, [modalRef]);

	useEffect(() => {
		return () => {
			if (isOpenDeletePostsModal) {
				setIsOpenDeletePostsModal(false);
			}
		};
	}, []);

	return (
		<div className="fixed left-0 top-0 z-[100] flex h-full w-full items-center justify-center bg-black-800">
			<div
				ref={modalRef}
				className="flex h-[12rem] w-modal-width flex-col rounded bg-white"
			>
				<div className="flex grow items-center justify-center">
					<p className="my-auto">
						{selectedPosts.length}개를
						<span className="font-medium text-danger"> 삭제</span>
						하시겠습니까?
					</p>
				</div>
				<div className="flex">
					<button
						type="button"
						className="h-[3.75rem] grow rounded-bl bg-btn-cancel-tekhelet text-black-800"
						onClick={closeModalHandler}
					>
						취소
					</button>
					<button
						type="button"
						className="h-[3.75rem] grow rounded-br bg-medium-slate-blue font-bold text-white"
						onClick={deletePostsHandler}
					>
						확인
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeletePostsModal;
