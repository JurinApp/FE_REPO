import GoBackButton from "@components/common/GoBackButton/GoBackButton";
import RegisterTradeStockForm from "./RegisterTradeStockForm";
import RegisterConfirmTradeStockModal from "./RegisterConfirmTradeStockModal";
import { useState } from "react";

const RegisterTradeStockContainer = () => {
	const [isRegister, setIsRegister] = useState<boolean>(false);

	return (
		<div className="relative mx-auto w-full bg-btn-cancel sm:w-[24.563rem]">
			<GoBackButton />
			<RegisterTradeStockForm isRegister={isRegister} />
			<RegisterConfirmTradeStockModal setIsRegister={setIsRegister} />
		</div>
	);
};

export default RegisterTradeStockContainer;
