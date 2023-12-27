import { openConfirmModalState } from "@/states/openConfirmModal";
import SignUpConfirmModal from "./SignUpConfirmModal";
import SignUpForm from "./SignUpForm";
import SignUpHeader from "./SignUpHeader";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

const SignUpContainer = () => {
	const [isOpenConfirmModal, setIsOpenConfirmModal] = useRecoilState(
		openConfirmModalState,
	);

	useEffect(() => {
		return () => {
			setIsOpenConfirmModal(false);
		};
	}, []);

	return (
		<div className="relative h-screen">
			<SignUpHeader />
			<SignUpForm />
			{isOpenConfirmModal && <SignUpConfirmModal />}
		</div>
	);
};

export default SignUpContainer;
