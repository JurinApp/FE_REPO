import Spinner from "@/components/common/spinner/Spinner";
import useAxios from "@/hooks/useAxios";
import { editItemModalState } from "@/states/confirmModalState";
import { INITIAL_VALUE, registerItemForm } from "@/states/registerItemForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";

interface IResult {
	imageUrl: string;
	isUpload: boolean;
}

const EditConfirmItemModal = () => {
	const [isOpenModal, setIsOpenModal] = useRecoilState(editItemModalState);
	const [itemFormValue, setItemFormValue] = useRecoilState(registerItemForm);
	const resetIsOpenModal = useResetRecoilState(editItemModalState);
	const { axiosData, isFetchLoading } = useAxios();
	const { channelId, itemId } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const modalRef = useRef<HTMLDivElement>(null);

	const handleClickCancelBtn = () => {
		setIsOpenModal(false);
	};

	const handleClickEditBtn = () => {
		editItemMutation.mutate();
	};

	const uploadImage = async () => {
		const formData = new FormData();

		if (itemFormValue.imageFile !== null) {
			formData.append("file", itemFormValue.imageFile);
		}

		const response = await axiosData("useToken", {
			method: "POST",
			url: `/teachers/api/v1/channels/${channelId}/files/upload`,
			data: formData,
		});

		if (response) {
			const status = response.status;

			let result: IResult = {
				imageUrl: "",
				isUpload: false,
			};

			if (status === 200) {
				result.imageUrl = response.data.data.fileUrl;
				result.isUpload = true;
			}

			return result;
		}
	};

	const editItemData = async () => {
		let result = await uploadImage();

		if (itemFormValue.imageFile === null) {
			result = {
				imageUrl: itemFormValue.imageUrl,
				isUpload: true,
			};
		}

		if (result && result.isUpload) {
			const response = await axiosData("useToken", {
				method: "PUT",
				url: `/teachers/api/v1/channels/${channelId}/items/${itemId}`,
				data: {
					title: itemFormValue.itemName,
					imageUrl: result.imageUrl,
					amount: itemFormValue.quantity,
					price: itemFormValue.price,
					content: itemFormValue.content,
				},
			});

			if (response) {
				const status = response.status;

				if (status === 200) {
					alert("수정이 완료되었습니다.");
					setItemFormValue(INITIAL_VALUE);
					queryClient.invalidateQueries({
						queryKey: ["detailItem", channelId, itemId],
					});
					queryClient.invalidateQueries({ queryKey: ["items", channelId] });
					setIsOpenModal(false);
					navigate(`/${channelId}/item/detail/${itemId}`);
				}

				if (status === 400) {
					alert("아이템 등록 형식을 다시 확인해주세요.");
				}

				if (status === 404) {
					alert("존재하지 않은 아이템입니다.");
					navigate(`/${channelId}/item`);
				}

				if (status === 500) {
					alert("서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
				}
			}
		} else {
			alert("이미지가 업로드 되지 않았습니다. 다시 업로드를 해주세요.");
		}
	};

	const editItemMutation = useMutation({
		mutationKey: ["editItem"],
		mutationFn: editItemData,
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
		return () => {
			if (isOpenModal) {
				resetIsOpenModal();
			}
		};
	}, []);

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
							<p className="my-auto">수정하시겠습니까?</p>
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
								onClick={handleClickEditBtn}
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

export default EditConfirmItemModal;
