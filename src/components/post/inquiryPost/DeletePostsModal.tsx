import { deletePostsModalState } from "@/states/modalState/confirmModalState";
import { selectedPostsState } from "@/states/selectedState/selectedPostState";
import {
	cancelLockBodyScroll,
	lockBodyScroll,
} from "@/utils/controlBodyScroll";
import { useEffect, useRef } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import Spinner from "@/components/common/spinner/Spinner";

const DeletePostsModal = () => {
	const [selectedPosts, setSelectedPosts] = useRecoilState(selectedPostsState);
	const [isOpenModal, setIsOpenModal] = useRecoilState(deletePostsModalState);
	const resetIsOpenModal = useResetRecoilState(deletePostsModalState);
	const modalRef = useRef<HTMLDivElement>(null);
	const { channelId } = useParams();
	const { axiosData, isFetchLoading } = useAxios();
	const queryClient = useQueryClient();

	const handleClickCancelBtn = () => {
		setIsOpenModal(false);
	};

	const handleClickDeleteBtn = () => {
		deletePostsMutation.mutate();
	};

	const deletePosts = async () => {
		const response = await axiosData("useToken", {
			method: "DELETE",
			url: `/teachers/api/v1/channels/${channelId}/posts`,
			data: {
				postIds: selectedPosts,
			},
		});

		if (response) {
			const status = response.status;

			if (status === 204) {
				alert("삭제가 완료되었습니다.");
				queryClient.invalidateQueries({ queryKey: ["posts", channelId] });
				setSelectedPosts([]);
				setIsOpenModal(false);
			}
		}
	};

	const deletePostsMutation = useMutation({
		mutationKey: ["deletePosts"],
		mutationFn: deletePosts,
	});

	useEffect(() => {
		const handleOutSideClick = (e: Event) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				setIsOpenModal(false);
			}
		};

		document.addEventListener("mousedown", handleOutSideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutSideClick);
		};
	}, [modalRef]);

	useEffect(() => {
		isOpenModal ? lockBodyScroll() : cancelLockBodyScroll();

		return () => {
			if (isOpenModal) {
				resetIsOpenModal();
			}
		};
	}, [isOpenModal]);

	return (
		<>
			{isFetchLoading ? (
				<Spinner />
			) : (
				<div
					className={`${
						isOpenModal ? "fixed" : "hidden"
					} left-0 top-0 z-[100] flex h-full w-full items-center justify-center bg-black-800`}
				>
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
								onClick={handleClickCancelBtn}
							>
								취소
							</button>
							<button
								type="button"
								className="h-[3.75rem] grow rounded-br bg-medium-slate-blue font-bold text-white"
								onClick={handleClickDeleteBtn}
							>
								확인
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default DeletePostsModal;
