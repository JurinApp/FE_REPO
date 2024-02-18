import PointLogo from "@assets/svg/point.svg?react";
import Plus from "@assets/svg/plus.svg?react";
import Minus from "@assets/svg/minus.svg?react";
import { IItem } from "./ItemContainer";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { itemBuyModalState } from "@/states/modalState/confirmModalState";
type TItemBuyModalProps = {
	readonly onConfirm: () => void;
	readonly item: IItem;
};

const ItemBuyModal = ({ onConfirm, item }: TItemBuyModalProps) => {
	const [itemQuantity, setItemQuantity] = useState(1);
	const [isItemBuyModalOpen, setIsItemBuyModalOpen] =
		useRecoilState(itemBuyModalState);
	const modalRef = useRef<HTMLDivElement>(null);
	const handleModalClose = () => {
		setIsItemBuyModalOpen(false);
	};
	const increaseItemQuantity = () => {
		if (itemQuantity < item.quantity) setItemQuantity(itemQuantity + 1);
	};

	const decreaseItemQuantity = () => {
		if (itemQuantity > 0) {
			setItemQuantity(itemQuantity - 1);
		}
	};

	useEffect(() => {
		const handleOutSideClick = (e: Event) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				setIsItemBuyModalOpen(false);
			}
		};
		document.addEventListener("mousedown", handleOutSideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutSideClick);
		};
	}, [modalRef]);

	return (
		<>
			<div
				className={`fixed ${
					isItemBuyModalOpen ? "flex" : "hidden"
				} top-0 z-[100] flex h-full w-full flex-col items-center justify-center bg-black-700`}
			>
				<div ref={modalRef}>
					<div className="bg-opacity-2 flex h-[21.813rem] w-[20.813rem] justify-center bg-[#ffffff]">
						<div className="flex flex-col">
							<div className="mt-12 flex h-[5.063rem] w-[17.813rem] justify-center border-b border-b-main-disabled">
								<p className="text-lg font-medium">
									<span className="font-bold text-tekhelet">
										{item.itemName}
									</span>
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
										{item.quantity} 개
									</p>
								</div>
								<div className="flex flex-row">
									<p className="ml-[2.375rem] pt-2 text-base">구매 수량</p>
									<div className="ml-[1.75rem] flex h-10 w-[7.375rem] flex-row">
										<button
											onClick={decreaseItemQuantity}
											className="flex h-10 w-10 items-center justify-center border border-black-300"
										>
											<Minus />
										</button>
										<p className="flex h-10 w-10 items-center justify-center border border-b-black-300 border-t-black-300">
											{itemQuantity}
										</p>
										<button
											onClick={increaseItemQuantity}
											className="flex h-10 w-10 items-center justify-center border border-black-300"
										>
											<Plus />
										</button>
									</div>
								</div>
								<div className="flex flex-row">
									<p className="ml-[2.375rem] flex w-[3.904rem] items-center text-base">
										금액
									</p>
									<div className="ml-[1.75rem] flex h-10 w-[7.375rem] flex-row items-center justify-end">
										<p className="mr-2 flex items-center justify-end">
											{item.price * itemQuantity}
										</p>
										<PointLogo />
									</div>
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

export default ItemBuyModal;
