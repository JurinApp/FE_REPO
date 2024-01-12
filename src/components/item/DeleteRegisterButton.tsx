import { selectedItemState } from "@/states/selectedItemState";
import { useRecoilValue } from "recoil";

const DeleteRegisterButton = () => {
	const selectedItems = useRecoilValue(selectedItemState);
	const isExistSelectedItems = selectedItems.length !== 0;

	return (
		<div className="flex w-full">
			<button
				type="button"
				className="grow rounded-[0.25rem] border border-danger bg-white font-bold text-danger disabled:border-black-300 disabled:bg-black-100 disabled:text-black-300"
				disabled={!isExistSelectedItems}
			>
				삭제
			</button>
			<button
				type="button"
				className="ml-2 h-[3.25rem] grow rounded-[0.25rem] border bg-tekhelet font-bold text-white"
			>
				등록
			</button>
		</div>
	);
};

export default DeleteRegisterButton;
