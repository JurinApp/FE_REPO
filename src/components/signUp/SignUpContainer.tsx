import { signUpConfirmModalState } from "@/states/signUpConfirmModal";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import SignUpConfirmModal from "./SignUpConfirmModal";
import SignUpForm from "./SignUpForm";

const SignUpContainer = () => {
	const [confirmModalState, setConfirmModalState] = useRecoilState(
		signUpConfirmModalState,
	);

	useEffect(() => {
		return () => {
			setConfirmModalState({ selectedAuth: "teacher", isModalOpen: false });
		};
	}, []);

	return (
		<div className="h-[calc(100vh - 2.938rem)] relative mx-auto px-4 sm:w-[24.563rem]">
			<SignUpForm />
			{confirmModalState.isModalOpen && <SignUpConfirmModal />}
		</div>
	);
};

export default SignUpContainer;
