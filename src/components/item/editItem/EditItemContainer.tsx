import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import EditItemForm from "./EditItemForm";
import { useRecoilValue } from "recoil";
import { editItemModalState } from "@/states/confirmModalState";
import EditConfirmItemModal from "./EditConfirmItemModal";

const EditItemContainer = () => {
	const isOpenEditItemModal = useRecoilValue(editItemModalState);

	return (
		<div className="relative mx-auto w-full bg-btn-cancel sm:w-[24.563rem]">
			<GoBackButton />
			<EditItemForm />
			{isOpenEditItemModal && <EditConfirmItemModal />}
		</div>
	);
};

export default EditItemContainer;
