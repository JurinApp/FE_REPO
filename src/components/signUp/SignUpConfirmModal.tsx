import { openConfirmModalState } from "@/states/openConfirmModal";
import { useSetRecoilState } from "recoil";

const SignUpConfirmModal = () => {
	const setIsOpenConfirmModal = useSetRecoilState(openConfirmModalState);

	const closeBtnModalHandler = () => {
		setIsOpenConfirmModal(false);
	};

	const confirmBtnModalHandler = () => {
		setIsOpenConfirmModal(false);
	};

	return (
		<div className="bg-black-800 fixed top-0 flex h-full w-full items-center justify-center">
			<div className="flex h-[12rem] w-[333px] flex-col rounded bg-white">
				<div className="flex grow items-center justify-center">
					<p className="my-auto">
						<span className="text-tekhelet font-medium">선생님</span>으로
						가입하시겠습니까?
					</p>
				</div>
				<div className="flex">
					<button
						type="button"
						className="text-black-800 bg-btn-cancel-tekhelet h-[3.75rem] grow rounded-bl"
						onClick={closeBtnModalHandler}
					>
						취소
					</button>
					<button
						type="button"
						className="bg-medium-slate-blue h-[3.75rem] grow rounded-br font-bold text-white"
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
