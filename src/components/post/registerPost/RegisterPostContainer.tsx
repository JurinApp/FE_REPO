import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import RegisterPostForm from "./RegisterPostForm";
import { useRecoilValue } from "recoil";
import { registerConfirmModalState } from "@/states/confirmModalState";
import RegisterConfirmModal from "./RegisterConfirmModal";

const RegisterPostContainer = () => {
	const isOpenRegisterModal = useRecoilValue(registerConfirmModalState);

	return (
		<div className="relative mx-auto w-full bg-btn-cancel sm:w-[24.563rem]">
			<GoBackButton />
			<RegisterPostForm />
			{isOpenRegisterModal && <RegisterConfirmModal />}
		</div>
	);
};

export default RegisterPostContainer;
