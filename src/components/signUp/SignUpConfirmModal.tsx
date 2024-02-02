import { signUpConfirmModalState } from "@/states/signUpConfirmModal";
import { useEffect, useRef } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

interface ISignUpConfirmModalProps {
	readonly setIsSignUp: (type: boolean) => void;
}

const SignUpConfirmModal = ({ setIsSignUp }: ISignUpConfirmModalProps) => {
	const [confirmModalState, setConfirmModalState] = useRecoilState(
		signUpConfirmModalState,
	);
	const resetConfirmModalState = useResetRecoilState(signUpConfirmModalState);
	const modalRef = useRef<HTMLDivElement>(null);
	const selectedAuthName =
		confirmModalState.selectedAuth === "1" ? "선생님" : "학생";

	const closeBtnModalHandler = () => {
		setConfirmModalState((prevState) => ({
			...prevState,
			isModalOpen: false,
		}));
	};

	const confirmBtnModalHandler = async () => {
		setConfirmModalState((prevState) => ({
			...prevState,
			isModalOpen: false,
		}));
		setIsSignUp(true);
	};

	useEffect(() => {
		const handleOutSideClick = (e: Event) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				setConfirmModalState((prevState) => ({
					...prevState,
					isModalOpen: false,
				}));
			}
		};

		document.addEventListener("mousedown", handleOutSideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutSideClick);
		};
	}, [modalRef]);

	useEffect(() => {
		return () => {
			resetConfirmModalState();
		};
	}, []);

	return (
		<div className="fixed left-0 top-0 z-[100] flex h-full w-full items-center justify-center bg-black-800">
			<div
				ref={modalRef}
				className="flex h-[12rem] w-[333px] flex-col rounded bg-white"
			>
				<div className="flex grow items-center justify-center">
					<p className="my-auto">
						<span className="font-medium text-tekhelet">
							{selectedAuthName}
						</span>
						으로 가입하시겠습니까?
					</p>
				</div>
				<div className="flex">
					<button
						type="button"
						className="h-[3.75rem] grow rounded-bl bg-btn-cancel-tekhelet text-black-800"
						onClick={closeBtnModalHandler}
					>
						취소
					</button>
					<button
						type="button"
						className="h-[3.75rem] grow rounded-br bg-medium-slate-blue font-bold text-white"
						onClick={confirmBtnModalHandler}
					>
						확인
					</button>
				</div>
			</div>
		</div>
	);
};

export default SignUpConfirmModal;
