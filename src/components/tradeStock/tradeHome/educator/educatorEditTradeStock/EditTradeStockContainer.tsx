import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import EditTradeStockForm from "./EditTradeStockForm";
import EditConfirmTradeStockModal from "./EditConfirmTradeStockModal";
import { useState } from "react";

const EditTradeStockContainer = () => {
	const [isEdit, setIsEdit] = useState<boolean>(false);

	return (
		<div className="relative mx-auto w-full bg-btn-cancel sm:w-[24.563rem]">
			<GoBackButton />
			<EditTradeStockForm isEdit={isEdit} />
			<EditConfirmTradeStockModal setIsEdit={setIsEdit} />
		</div>
	);
};

export default EditTradeStockContainer;
