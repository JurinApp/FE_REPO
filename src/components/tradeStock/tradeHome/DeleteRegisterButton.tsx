import { deleteStocksModalState } from "@/states/modalState/confirmModalState";
import { selectedStock } from "@/states/selectedState/selectedTradeStock";
import { userRoleState } from "@/states/userRoleState";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const date = new Date();
const hours = date.getHours();

const DeleteRegisterButton = () => {
	const selectedStocks = useRecoilValue(selectedStock);
	const userRole = useRecoilValue(userRoleState);
	const setIsOpenModal = useSetRecoilState(deleteStocksModalState);
	const navigate = useNavigate();
	const { channelId } = useParams();

	const handleDeleteStocks = () => {
		setIsOpenModal(true);
	};

	const checkRegisterTime = () => {
		if (hours >= 9 && hours < 15) {
			alert("주식 등록은 09:00 ~ 15:00 이후에 가능합니다");
		} else {
			navigate(`/${channelId}/trade/stock/register`);
		}
	};

	return (
		<div
			className={`${
				userRole === "teacher" ? "flex" : "hidden"
			} absolute bottom-6 left-0 w-full px-4`}
		>
			<button
				type="button"
				disabled={selectedStocks.length === 0 ? true : false}
				className="mr-1 h-box-height grow rounded border border-danger bg-white font-bold text-danger disabled:border-black-300 disabled:bg-black-100 disabled:text-black-300 "
				onClick={handleDeleteStocks}
			>
				삭제
			</button>
			<button
				onClick={checkRegisterTime}
				type="button"
				className="ml-1 flex h-box-height grow items-center justify-center rounded bg-tekhelet font-bold text-white"
			>
				등록
			</button>
		</div>
	);
};

export default DeleteRegisterButton;
