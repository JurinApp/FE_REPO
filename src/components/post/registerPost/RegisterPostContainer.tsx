import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import RegisterPostForm from "./RegisterPostForm";
import RegisterPostConfirmModal from "./RegisterPostConfirmModal";
import { useState } from "react";
import { useParams } from "react-router-dom";

const RegisterPostContainer = () => {
	const [isRegister, setIsRegister] = useState<boolean>(false);
	const { channelId } = useParams();

	return (
		<div className="relative mx-auto w-full bg-btn-cancel sm:w-[24.563rem]">
			<GoBackButton backNavigationPath={`/${channelId}/post`} />
			<RegisterPostForm isRegister={isRegister} />
			<RegisterPostConfirmModal setIsRegister={setIsRegister} />
		</div>
	);
};

export default RegisterPostContainer;
