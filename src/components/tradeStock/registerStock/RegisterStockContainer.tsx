import GoBackButton from "@components/common/GoBackButton/GoBackButton";
import RegisterStockForm from "./RegisterStockForm";
import RegisterConfirmStockModal from "./RegisterConfirmStockModal";
import { useState } from "react";

const RegisterStockContainer = () => {
	const [isRegister, setIsRegister] = useState<boolean>(false);

	return (
		<div className="relative mx-auto w-full bg-btn-cancel sm:w-[24.563rem]">
			<GoBackButton />
			<RegisterStockForm isRegister={isRegister} />
			<RegisterConfirmStockModal setIsRegister={setIsRegister} />
		</div>
	);
};

export default RegisterStockContainer;
