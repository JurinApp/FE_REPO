import { deleteItemsModalState } from "@/states/modalState/confirmModalState";
import { selectedItemState } from "@/states/selectedState/selectedItemState";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const date = new Date();
const hours = date.getHours();

const DeleteRegisterButton = () => {
	const selectedItems = useRecoilValue(selectedItemState);
	const isExistSelectedItems = selectedItems.length !== 0;
	const setIsOpenModal = useSetRecoilState(deleteItemsModalState);
	const { channelId } = useParams();
	const navigate = useNavigate();

	const handleDeleteItems = () => {
		setIsOpenModal(true);
	};

	const checkRegisterTime = () => {
		if (hours >= 9 && hours < 15) {
			alert("아이템 등록은 09:00 ~ 15:00 이후에 가능합니다");
		} else {
			navigate(`/${channelId}/item/register`);
		}
	};

	return (
		<div className="absolute bottom-6 left-0 flex w-full px-4">
			<button
				type="button"
				className="h-box-height grow rounded-[0.25rem] border border-danger bg-white font-bold text-danger disabled:border-black-300 disabled:bg-black-100 disabled:text-black-300"
				disabled={!isExistSelectedItems}
				onClick={handleDeleteItems}
			>
				삭제
			</button>
			<button
				type="button"
				onClick={checkRegisterTime}
				className="ml-2 flex h-box-height grow items-center justify-center rounded bg-tekhelet font-bold text-white"
			>
				등록
			</button>
		</div>
	);
};

export default DeleteRegisterButton;
