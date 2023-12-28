import { openConfirmModalState } from "@/states/openConfirmModal";
import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";

const SignUpConfirmModal = () => {
	const setIsOpenConfirmModal = useSetRecoilState(openConfirmModalState);
	const modalRef = useRef<HTMLDivElement>(null);

	const closeBtnModalHandler = () => {
		setIsOpenConfirmModal(false);
	};

	const confirmBtnModalHandler = () => {
		setIsOpenConfirmModal(false);
	};

	useEffect(() => {
		const outSideClickHandler = (e: Event) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				setIsOpenConfirmModal(false);
			}
		};

		document.addEventListener("mousedown", outSideClickHandler);

		return () => {
			document.removeEventListener("mousedown", outSideClickHandler);
		};
	}, [modalRef]);

	return (
		<div className="fixed top-0 flex h-full w-full items-center justify-center bg-black-800">
			<div
				ref={modalRef}
				className="flex h-[12rem] w-[333px] flex-col rounded bg-white"
			>
				<div className="flex grow items-center justify-center">
					<p className="my-auto">
						<span className="font-medium text-tekhelet">선생님</span>으로
						가입하시겠습니까?
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
