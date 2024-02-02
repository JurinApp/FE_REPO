import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import EditConfirmPostModal from "./EditConfirmPostModal";
import EditPostForm from "./EditPostForm";
import { useState } from "react";

const EditPostContainer = () => {
	const [isEdit, setIsEdit] = useState<boolean>(false);

	return (
		<div className="relative mx-auto w-full bg-btn-cancel sm:w-[24.563rem]">
			<GoBackButton />
			<EditPostForm isEdit={isEdit} />
			<EditConfirmPostModal setIsEdit={setIsEdit} />
		</div>
	);
};

export default EditPostContainer;
