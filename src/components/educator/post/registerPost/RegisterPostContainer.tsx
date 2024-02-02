import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import RegisterPostForm from "./RegisterPostForm";
import RegisterPostConfirmModal from "./RegisterPostConfirmModal";
import { useState } from "react";

const RegisterPostContainer = () => {
	const [isRegister, setIsRegister] = useState<boolean>(false);

	return (
		<div className="relative mx-auto w-full bg-btn-cancel sm:w-[24.563rem]">
			<GoBackButton />
			<RegisterPostForm isRegister={isRegister} />
			<RegisterPostConfirmModal setIsRegister={setIsRegister} />
		</div>
	);
};

export default RegisterPostContainer;
