import useAxios from "@/hooks/useAxios";
import { itemBuyModalState } from "@/states/modalState/confirmModalState";
import { studentSelectedItem } from "@/states/studentSelectedItem";
import Minus from "@assets/svg/minus.svg?react";
import Plus from "@assets/svg/plus.svg?react";
import PointLogo from "@assets/svg/point.svg?react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

interface ISubmitData {
	readonly price: number;
	readonly amount: number;
}

const ItemBuyModal = () => {
	const [isItemBuyModalOpen, setIsItemBuyModalOpen] =
		useRecoilState(itemBuyModalState);
	const item = useRecoilValue(studentSelectedItem);
	const resetItemBuyModal = useResetRecoilState(itemBuyModalState);
	const resetSelectedStudentItem = useResetRecoilState(studentSelectedItem);
	const [itemQuantity, setItemQuantity] = useState(1);
	const modalRef = useRef<HTMLFormElement>(null);
	const { channelId } = useParams();
	const { axiosData } = useAxios();
	const queryClient = useQueryClient();

	const handleModalClose = () => {
		setIsItemBuyModalOpen(false);
	};

	const increaseItemQuantity = () => {
		if (item && itemQuantity >= item?.amount) return;
		setItemQuantity((prev) => prev + 1);
	};

	const decreaseItemQuantity = () => {
		if (itemQuantity > 1) {
			setItemQuantity((prev) => prev - 1);
		}
	};

	const buyItem = async (submitData: ISubmitData) => {
		if (item) {
			const apiUrl = `/students/api/v1/channels/${channelId}/items/${item.id}`;
			const response = await axiosData("useToken", {
				method: "POST",
				url: apiUrl,
				data: submitData,
			});
			if (response) {
				const status = response.status;

				if (status === 200) {
					alert("구매가 완료되었습니다.");
					queryClient.invalidateQueries({ queryKey: ["studentItem"] });
				}

				if (status === 400) {
					alert("포인트가 부족합니다.");
				}

				setIsItemBuyModalOpen(false);
			}
		}
	};

	const { mutate } = useMutation({
		mutationFn: buyItem,
	});

	const handleBuyItem = (e: FormEvent) => {
		e.preventDefault();
		if (item) {
			const submitData: ISubmitData = {
				price: item.price,
				amount: itemQuantity,
			};
			mutate(submitData);
		}
	};

	useEffect(() => {
		return () => {
			resetItemBuyModal();
			resetSelectedStudentItem();
		};
	}, []);

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
				} left-0 top-0 z-[100] flex h-full w-full flex-col items-center justify-center bg-black-700`}
			>
				<form onSubmit={handleBuyItem} ref={modalRef}>
					<div className="bg-opacity-2 flex h-[21.813rem] w-[20.813rem] justify-center bg-white">
						<div className="flex flex-col">
							<div className="mt-12 flex h-[5.063rem] w-[17.813rem] justify-center border-b border-b-main-disabled">
								<p className="text-lg font-medium">
									<span className="font-bold text-tekhelet">{item?.title}</span>
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
										{item?.amount} 개
									</p>
								</div>
								<div className="flex flex-row">
									<p className="ml-[2.375rem] pt-2 text-base">구매 수량</p>
									<div className="ml-[1.75rem] flex h-10 w-[7.375rem] flex-row">
										<button
											type="button"
											onClick={decreaseItemQuantity}
											className="flex h-10 w-10 items-center justify-center border border-black-100"
										>
											<Minus />
										</button>
										<p className="flex h-10 w-10 items-center justify-center border border-y-black-100">
											{itemQuantity}
										</p>
										<button
											type="button"
											onClick={increaseItemQuantity}
											className="flex h-10 w-10 items-center justify-center border border-black-100"
										>
											<Plus />
										</button>
									</div>
								</div>
								<div className="flex flex-row">
									<p className="ml-[2.375rem] flex w-[3.904rem] items-center">
										금액
									</p>
									<div className="ml-[1.75rem] flex h-10 w-[7.375rem] flex-row items-center justify-end">
										<p className="mr-2 flex items-center justify-end">
											{item && item?.price * itemQuantity}
										</p>
										<PointLogo />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex h-[3.75rem] w-[20.813rem] flex-row">
						<button
							type="button"
							className="w-1/2 bg-btn-cancel"
							onClick={handleModalClose}
						>
							취소
						</button>
						<button
							type="submit"
							className="w-1/2 bg-medium-slate-blue text-white"
						>
							구매
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default ItemBuyModal;
