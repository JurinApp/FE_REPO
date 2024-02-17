import Spinner from "@/components/common/spinner/Spinner";
import useAxios from "@/hooks/useAxios";
import { deleteDetailTradeStockModalState } from "@/states/modalState/confirmModalState";
import {
	cancelLockBodyScroll,
	lockBodyScroll,
} from "@/utils/controlBodyScroll";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";

const DeleteStockModal = () => {
	const [isOpenModal, setIsOpenModal] = useRecoilState(
		deleteDetailTradeStockModalState,
	);
	const { channelId, stockId } = useParams();
	const { axiosData, isFetchLoading } = useAxios();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const resetIsOpenModal = useResetRecoilState(
		deleteDetailTradeStockModalState,
	);
	const modalRef = useRef<HTMLDivElement>(null);

	const deleteStockData = async () => {
		const response = await axiosData("useToken", {
			method: "DELETE",
			url: `/teachers/api/v1/channels/${channelId}/stocks/${stockId}`,
		});

		if (response) {
			const status = response.status;

			if (status === 204) {
				alert("삭제가 완료되었습니다.");
				queryClient.invalidateQueries({ queryKey: ["stocks", channelId] });
				queryClient.removeQueries({
					queryKey: ["detailStock", channelId, stockId],
				});
				navigate(`/${channelId}/trade/home`);
			}

			if (status === 400) {
				alert("주식 거래 시간에는 삭제가 불가능합니다.");
			}

			if (status === 500) {
				alert("서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
			}

			setIsOpenModal(false);
		}
	};

	const deleteStockMutation = useMutation({
		mutationKey: ["deleteStock"],
		mutationFn: deleteStockData,
	});

	const handleClickCancelBtn = () => {
		setIsOpenModal(false);
	};

	const handleClickDeleteBtn = () => {
		deleteStockMutation.mutate();
	};

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
								주식거래 상품을
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

export default DeleteStockModal;
