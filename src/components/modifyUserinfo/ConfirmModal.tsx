type TConfirmModalProps = {
	isOpen: boolean;
	onConfirm: () => void;
	onCancel: () => void;
};
export const ConfirmModal = (props: TConfirmModalProps) => {
	const { isOpen, onConfirm, onCancel } = props;
	if (!isOpen) return null;

	return (
		<>
			<div className="fixed left-1/2 top-1/2 h-[852px] w-[393px] -translate-x-1/2 -translate-y-1/2 transform bg-black opacity-50"></div>
			<div className="fixed left-1/2 top-1/2 flex h-[179px] w-[333px] -translate-x-1/2 -translate-y-2/3 transform flex-col">
				<div className="bg-opacity-2 flex h-[119px] items-center justify-center bg-[#ffffff]">
					<p className="font-[500] text-[#000000]">수정하시겠습니까?</p>
				</div>
				<div className="flex h-[60px] flex-row">
					<button className="w-1/2 bg-gray-300" onClick={onCancel}>
						취소
					</button>
					<button className="w-1/2 bg-[#3d348b] text-[#ffffff]">확인</button>
				</div>
			</div>
		</>
	);
};
