import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import EditTradeStockForm from "./EditTradeStockForm";

const EditTradeStockContainer = () => {
	return (
		<div className="relative mx-auto w-full bg-btn-cancel sm:w-[24.563rem]">
			<GoBackButton />
			<EditTradeStockForm />
		</div>
	);
};

export default EditTradeStockContainer;
