import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import EditConfirmItemModal from "./EditConfirmItemModal";
import EditItemForm from "./EditItemForm";
import { useState } from "react";

const EditItemContainer = () => {
	const [isEdit, setIsEdit] = useState<boolean>(false);

	return (
		<div className="relative mx-auto w-full bg-btn-cancel sm:w-[24.563rem]">
			<GoBackButton />
			<EditItemForm isEdit={isEdit} />
			<EditConfirmItemModal setIsEdit={setIsEdit} />
		</div>
	);
};

export default EditItemContainer;
