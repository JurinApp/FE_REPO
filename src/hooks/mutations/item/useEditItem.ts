import useAxios from "@/hooks/useAxios";
import { editItemModalState } from "@/states/modalState/confirmModalState";
import { registerItemForm } from "@/states/registerItemForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface IResult {
	imageUrl: string;
	isUpload: boolean;
}

const useEditItem = () => {
	const itemFormValue = useRecoilValue(registerItemForm);
	const setIsOpenModal = useSetRecoilState(editItemModalState);
	const { axiosData } = useAxios();
	const { channelId, itemId } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

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

	return useMutation({
		mutationKey: ["editItem"],
		mutationFn: editItemData,
	});
};

export default useEditItem;
