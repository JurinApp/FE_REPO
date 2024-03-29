import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import EditStockForm from "./EditStockForm";
import EditConfirmStockModal from "./EditConfirmStockModal";
import { useState } from "react";
import { useParams } from "react-router-dom";

const EditTradeStockContainer = () => {
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const { channelId, stockId } = useParams();

	return (
		<div className="relative mx-auto w-full bg-btn-cancel sm:w-[24.563rem]">
			<GoBackButton
				backNavigationPath={`/${channelId}/trade/stock/detail/${stockId}`}
			/>
			<EditStockForm isEdit={isEdit} />
			<EditConfirmStockModal setIsEdit={setIsEdit} />
		</div>
	);
};

export default EditTradeStockContainer;
