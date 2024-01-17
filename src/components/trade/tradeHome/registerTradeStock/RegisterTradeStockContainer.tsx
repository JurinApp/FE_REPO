import GoBackButton from "@components/common/GoBackButton/GoBackButton";
import RegisterTradeStockForm from "./RegisterTradeStockForm";

const RegisterTradeStockContainer = () => {
	return (
		<div className="relative mx-auto w-full bg-btn-cancel sm:w-[24.563rem]">
			<GoBackButton />
			<RegisterTradeStockForm />
		</div>
	);
};

export default RegisterTradeStockContainer;
