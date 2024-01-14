import { paymentPointModalState } from "@/states/confirmModalState";
import Decrease from "@assets/svg/decreaseIcon.svg?react";
import Increase from "@assets/svg/increaseIcon.svg?react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

const PaymentPointModal = () => {
	const modalRef = useRef<HTMLDivElement>(null);
	const [isOpenPaymentPointModal, setIsOpenPaymentPointModal] = useRecoilState(
		paymentPointModalState,
	);
	const [point, setPoint] = useState<number>(0);
	const [replacePoint, setReplacePoint] = useState<string>("0");

	const closeModalHandler = () => {
		setIsOpenPaymentPointModal(false);
	};

	const paymentPointHandler = () => {
		setIsOpenPaymentPointModal(false);
	};

	const onClickSwitchBtnHandler = (type: string) => {
		const numericValue = parseFloat(replacePoint.replace(/,/g, ""));

		if (type === "decrease" && point !== 0) {
			setPoint((prev) => prev - 100);
			setReplacePoint((numericValue - 100).toLocaleString());
		}

		if (type === "increase") {
			setPoint((prev) => prev + 100);
			setReplacePoint((numericValue + 100).toLocaleString());
		}
	};

	const onChangePointHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const numericValue = parseFloat(value.replace(/,/g, ""));

		if (!isNaN(numericValue)) {
			setPoint(numericValue);
			setReplacePoint(numericValue.toLocaleString());
		} else {
			setPoint(0);
			setReplacePoint("0");
		}
	};

	useEffect(() => {
		const outSideClickHandler = (e: Event) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				setIsOpenPaymentPointModal(false);
			}
		};

		document.addEventListener("mousedown", outSideClickHandler);

		return () => {
			document.removeEventListener("mousedown", outSideClickHandler);
		};
	}, [modalRef]);

	useEffect(() => {
		return () => {
			if (isOpenPaymentPointModal) {
				setIsOpenPaymentPointModal(false);
			}
		};
	}, []);

	return (
		<div className="fixed top-0 z-[100] flex h-full w-full items-center justify-center bg-black-800">
			<div
				ref={modalRef}
				className="flex w-modal-width flex-col rounded bg-white"
			>
				<div className="mb-6 mt-12 flex grow items-center justify-center">
					<p className="my-auto text-lg">포인트를 지급하시겠습니까?</p>
				</div>
				<div className="mx-auto mb-12 mt-6 flex">
					<button
						className="flex h-10 w-10 items-center justify-center border border-black-100"
						onClick={() => onClickSwitchBtnHandler("decrease")}
					>
						<Decrease />
					</button>
					<input
						type="text"
						className="flex w-[4.5rem] items-center justify-center border-b border-t border-black-100 text-center font-medium outline-none"
						onChange={onChangePointHandler}
						value={replacePoint}
						maxLength={6}
					/>
					<button
						className="flex h-10 w-10 items-center justify-center border border-black-100"
						onClick={() => onClickSwitchBtnHandler("increase")}
					>
						<Increase />
					</button>
				</div>
				<div className="flex">
					<button
						type="button"
						className="h-[3.75rem] grow rounded-bl bg-btn-cancel-tekhelet text-black-800"
						onClick={closeModalHandler}
					>
						취소
					</button>
					<button
						type="button"
						className="h-[3.75rem] grow rounded-br bg-medium-slate-blue font-bold text-white"
						onClick={paymentPointHandler}
					>
						확인
					</button>
				</div>
			</div>
		</div>
	);
};

export default PaymentPointModal;
