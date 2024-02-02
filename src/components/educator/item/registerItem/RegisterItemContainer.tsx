import { useState } from "react";
import GoBackButton from "../../../common/GoBackButton/GoBackButton";
import RegisterItemConfirmModal from "./RegisterItemConfirmModal";
import RegisterItemForm from "./RegisterItemForm";

const RegisterItemContainer = () => {
	const [isRegister, setIsRegister] = useState<boolean>(false);

	return (
		<div className="relative mx-auto w-full bg-btn-cancel sm:w-[24.563rem]">
			<GoBackButton />
			<RegisterItemForm isRegister={isRegister} />
			<RegisterItemConfirmModal setIsRegister={setIsRegister} />
		</div>
	);
};

export default RegisterItemContainer;
