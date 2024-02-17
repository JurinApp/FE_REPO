import { registerItemModalState } from "@/states/confirmModalState";
import { INITIAL_VALUE, registerItemForm } from "@/states/registerItemForm";
import { useEffect, useRef } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "@/components/common/spinner/Spinner";

interface IResult {
	imageUrl: string;
	isUpload: boolean;
}

const RegisterItemConfirmModal = () => {
	const [isOpenModal, setIsOpenModal] = useRecoilState(registerItemModalState);
	const [itemFormValue, setItemFormValue] = useRecoilState(registerItemForm);
	const resetIsOpenModal = useResetRecoilState(registerItemModalState);
	const { axiosData, isFetchLoading } = useAxios();
	const { channelId } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const modalRef = useRef<HTMLDivElement>(null);

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

	const registerItemData = async () => {
		const result = await uploadImage();

		if (result && result.isUpload) {
			const response = await axiosData("useToken", {
				method: "POST",
				url: `/teachers/api/v1/channels/${channelId}/items`,
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

				if (status === 201) {
					const itemId = response.data.data.id;
					alert("아이템 등록이 완료 되었습니다.");
					setItemFormValue(INITIAL_VALUE);
					queryClient.invalidateQueries({ queryKey: ["items", channelId] });
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
					alert("서버에 오류가 발생하였습니다. 다시 시도해주세요.");
				}
			}
		} else {
			alert("이미지가 업로드 되지 않았습니다. 다시 업로드를 해주세요.");
		}
	};

	const registerItemMutation = useMutation({
		mutationKey: ["registerItem"],
		mutationFn: registerItemData,
	});

	const handleClickCancelBtn = () => {
		setIsOpenModal(false);
	};

	const handleClickRegisterBtn = () => {
		setIsOpenModal(false);
		registerItemMutation.mutate();
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
							<p className="my-auto">등록하시겠습니까?</p>
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
								onClick={handleClickRegisterBtn}
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

export default RegisterItemConfirmModal;
