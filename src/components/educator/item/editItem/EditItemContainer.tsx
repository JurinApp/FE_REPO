import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import EditConfirmItemModal from "./EditConfirmItemModal";
import EditItemForm from "./EditItemForm";

const EditItemContainer = () => {
	return (
		<div className="relative mx-auto w-full bg-btn-cancel sm:w-[24.563rem]">
			<GoBackButton />
			<EditItemForm />
			<EditConfirmItemModal />
		</div>
	);
};

export default EditItemContainer;
