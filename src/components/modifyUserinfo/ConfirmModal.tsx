type TConfirmModalProps = {
	isOpen: boolean;
	onConfirm: () => void;
	onCancel: () => void;
};
export const ConfirmModal = (props: TConfirmModalProps) => {
	const { isOpen, onCancel } = props;
	if (!isOpen) return null;

	return (
		<>
			<div
				className="fixed left-1/2 top-0 h-[100vh] w-[24.563rem] -translate-x-1/2  transform bg-black-800"
				onClick={onCancel}
			></div>
			<div className="fixed left-1/2 top-1/2 flex h-[17.5rem] w-[333px] -translate-x-1/2 -translate-y-1/3 transform flex-col">
				<div className="bg-opacity-2 flex h-[7.438rem] items-center justify-center bg-[#ffffff]">
					<p className="font-medium text-[#000000]">수정하시겠습니까?</p>
				</div>
				<div className="flex h-[3.75rem] flex-row">
					<button className="w-1/2 bg-gray-300" onClick={onCancel}>
						취소
					</button>
					<button className="w-1/2 bg-tekhelet text-[#ffffff]">확인</button>
				</div>
			</div>
		</>
	);
};
