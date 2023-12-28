import { signUpConfirmModalState } from "@/states/signUpConfirmModal";
import SignUpConfirmModal from "./SignUpConfirmModal";
import SignUpForm from "./SignUpForm";
import SignUpHeader from "./SignUpHeader";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

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
		<div className="relative h-screen">
			<SignUpHeader />
			<SignUpForm />
			{confirmModalState.isModalOpen && <SignUpConfirmModal />}
		</div>
	);
};

export default SignUpContainer;
