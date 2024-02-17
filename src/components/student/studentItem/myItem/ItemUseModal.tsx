import { IMyItemList } from "./MyItemContainer";
import { useRecoilState } from "recoil";
import { itemUseModalState } from "@/states/confirmModalState";
import { useEffect, useRef } from "react";
type TItemBuyModalProps = {
	readonly onConfirm: () => void;
	readonly item: IMyItemList;
};

const ItemUseModal = ({ onConfirm, item }: TItemBuyModalProps) => {
	// const [itemQuantity, setItemQuantity] = useState(1);
	const [isItemUseModalOpen, setIsItemUseModalOpen] =
		useRecoilState(itemUseModalState);
	const modalRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleOutSideClick = (e: Event) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				setIsItemUseModalOpen(false);
			}
		};
		document.addEventListener("mousedown", handleOutSideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutSideClick);
		};
	}, [modalRef]);
	const handleModalClose = () => {
		setIsItemUseModalOpen(false);
	};
	return (
		<>
			<div
				className={`${
					isItemUseModalOpen ? "flex" : "hidden"
				} fixed top-0 z-[100] flex h-full w-full flex-col items-center justify-center bg-black-700`}
			>
				<div ref={modalRef}>
					<div className="bg-opacity-2 flex h-[21.813rem] w-[20.813rem] justify-center bg-[#ffffff]">
						<div className="flex flex-col">
							<div className="mt-12 flex h-[5.063rem] w-[17.813rem] justify-center border-b border-b-main-disabled">
								<p className="text-lg font-medium">
									<span className="font-bold text-tekhelet">{item.title}</span>
									을
									<br />
									구매하시겠습니까?
								</p>
							</div>
							<div className="flex w-[17.813rem] flex-col">
								<div className="mt-6 flex w-[17.813rem] flex-row">
									<p className="ml-[2.375rem] flex items-center text-base">
										남은 수량
									</p>
									<p className="ml-[1.75rem] flex h-10 w-[7.375rem] items-center justify-end text-right text-base">
										{item.remainingAmount} 개
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex h-[3.75rem] w-[20.813rem] flex-row">
						<button className="w-1/2 bg-btn-cancel" onClick={handleModalClose}>
							취소
						</button>
						<button
							className="w-1/2 bg-medium-slate-blue text-[#ffffff]"
							onClick={onConfirm}
						>
							구매
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ItemUseModal;
