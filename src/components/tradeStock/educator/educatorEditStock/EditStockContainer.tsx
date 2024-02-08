import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import EditStockForm from "./EditStockForm";
import EditConfirmStockModal from "./EditConfirmStockModal";
import { useState } from "react";

const EditTradeStockContainer = () => {
	const [isEdit, setIsEdit] = useState<boolean>(false);

	return (
		<div className="relative mx-auto w-full bg-btn-cancel sm:w-[24.563rem]">
			<GoBackButton />
			<EditStockForm isEdit={isEdit} />
			<EditConfirmStockModal setIsEdit={setIsEdit} />
		</div>
	);
};

export default EditTradeStockContainer;
