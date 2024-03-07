import ErrorMsg from "@/components/common/errorMsg/ErrorMsg";
import Spinner from "@/components/common/spinner/Spinner";
import { ERROR_MESSAGES } from "@/constants/itemErrorMessages";
import useEditDetailItem from "@/hooks/queries/item/useEditDetailItem";
import { editItemModalState } from "@/states/modalState/confirmModalState";
import { registerItemForm } from "@/states/registerItemForm";
import Decrease from "@assets/svg/decreaseIcon.svg?react";
import DeleteImage from "@assets/svg/deleteImage.svg?react";
import Increase from "@assets/svg/increaseIcon.svg?react";
import Logo from "@assets/svg/subColorLogo.svg?react";
import _ from "lodash";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";

interface IErrors {
	readonly itemNameError: {
		readonly isError: boolean;
		readonly errorMessage: string;
	};
	readonly priceError: {
		readonly isError: boolean;
		readonly errorMessage: string;
	};
	readonly contentError: {
		readonly isError: boolean;
		readonly errorMessage: string;
	};
	readonly itemImageError: {
		readonly isError: boolean;
		readonly errorMessage: string;
	};
}

interface IResponseData {
	readonly id: number;
	readonly title: string;
	readonly imageUrl: string;
	readonly amount: number;
	readonly price: number;
	readonly content: string;
}

const EditItemForm = () => {
	const [itemFormValue, setItemFormValue] = useRecoilState(registerItemForm);
	const setIsOpenModal = useSetRecoilState(editItemModalState);
	const resetItemFormValue = useResetRecoilState(registerItemForm);
	const [thumbNail, setThumbNail] = useState<string>("");
	const [replacePrice, setReplacePrice] = useState<string>("");
	const [errors, setErrors] = useState<IErrors>({
		itemNameError: {
			isError: false,
			errorMessage: "",
		},
		priceError: {
			isError: false,
			errorMessage: "",
		},
		contentError: {
			isError: false,
			errorMessage: "",
		},
		itemImageError: {
			isError: false,
			errorMessage: "",
		},
	});
	const { data, isLoading } = useEditDetailItem();

	const successGetItemData = (responseData: IResponseData) => {
		setItemFormValue({
			itemName: responseData.title,
			imageFile: null,
			imageUrl: responseData.imageUrl,
			quantity: responseData.amount,
			price: responseData.price,
			content: responseData.content,
		});
		setThumbNail(responseData.imageUrl);
		setReplacePrice(responseData.price.toLocaleString());
	};

	const handleDeleteImage = () => {
		setThumbNail("");
		setItemFormValue((prev) => ({ ...prev, imageFile: null, imageUrl: "" }));
		setErrors((prev) => ({
			...prev,
			itemImageError: {
				isError: false,
				errorMessage: "",
			},
		}));
	};

	const setItemFormErrors = (key: string, isError: boolean) => {
		setErrors((prev) => ({
			...prev,
			[`${key}Error`]: {
				isError,
				errorMessage: isError ? ERROR_MESSAGES[key] : "",
			},
		}));
	};

	const handleChangeFormCheckValidation = (
		id: string,
		value: string | null,
	) => {
		let isError: boolean = false;

		if (id === "itemImage") {
			isError = value === null;
		} else {
			isError = value !== null && value.length === 0;
		}

		setItemFormErrors(id, isError);
	};

	const handleChangeThumbNailImage = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.files) {
			const imgFile = e.currentTarget.files[0];
			let value = "upload";

			!e.currentTarget.files[0]
				? handleChangeFormCheckValidation("itemImage", null)
				: handleChangeFormCheckValidation("itemImage", value);

			setItemFormValue((prev) => ({ ...prev, imageFile: imgFile }));

			const reader = new FileReader();
			reader.readAsDataURL(imgFile);

			reader.onload = (e) => {
				if (e.target !== null) {
					setThumbNail(e.target.result as string);
				}
			};
		}
	};

	const handleChangeQuantity = (type: string) => {
		if (type === "decrease" && itemFormValue.quantity === 1) return;

		const increment = type === "decrease" ? -1 : 1;
		const newQuantity = itemFormValue.quantity + increment;

		setItemFormValue((prev) => ({
			...prev,
			quantity: newQuantity,
		}));
	};

	const handleChangePrice = (value: string) => {
		const numericValue = parseFloat(value.replace(/,/g, ""));
		if (!isNaN(numericValue)) {
			setItemFormValue({ ...itemFormValue, price: numericValue });
			setReplacePrice(numericValue.toLocaleString());
		} else {
			setItemFormValue({ ...itemFormValue, price: 0 });
			setReplacePrice("");
		}
	};

	const handleChangeFormValue = _.throttle((e) => {
		const id = e.target.id;
		const value = e.target.value;

		if (id === "price") {
			handleChangePrice(value);
		} else {
			setItemFormValue((prev) => ({ ...prev, [id]: value }));
		}
		handleChangeFormCheckValidation(id, value);
	}, 1000);

	const formCheckValidation = () => {
		const validations: { [key: string]: boolean } = {
			itemName: itemFormValue.itemName.length === 0,
			price: itemFormValue.price === 0,
			content: itemFormValue.content.length === 0,
			itemImage:
				itemFormValue.imageFile === null && itemFormValue.imageUrl.length === 0,
		};

		Object.keys(validations).forEach((key) => {
			if (validations[key]) {
				setItemFormErrors(key, true);
			}
		});

		return Object.values(validations).includes(true);
	};

	const handleClickEditBtn = (e: FormEvent) => {
		e.preventDefault();

		if (formCheckValidation()) return;
		setIsOpenModal(true);
	};

	useEffect(() => {
		if (data) {
			successGetItemData(data);
		}
	}, [data]);

	useEffect(() => {
		return () => {
			resetItemFormValue();
		};
	}, []);

	return (
		<div className="h-[calc(100vh-7.125rem)] w-full px-4 pt-6">
			{isLoading ? (
				<Spinner />
			) : (
				<form onSubmit={handleClickEditBtn}>
					<div className="flex h-[calc(100vh-18rem)] flex-col items-center overflow-y-auto bg-white px-4 py-4">
						<div className="w-full sm:w-[19.563rem]">
							<label htmlFor="itemName" className="hidden">
								아이템명
							</label>
							<input
								type="text"
								id="itemName"
								value={itemFormValue.itemName}
								className={`mb-2 w-full rounded-none border-b pb-4 font-bold outline-none placeholder:text-black-300 sm:w-[19.563rem] ${
									errors.itemNameError.isError
										? "border-danger"
										: "border-black-100 focus:border-black-300"
								}`}
								placeholder="아이템명을 입력해주세요"
								onChange={handleChangeFormValue}
							/>
							{errors.itemNameError.isError && (
								<ErrorMsg message={errors.itemNameError.errorMessage} />
							)}
						</div>
						<div>
							{thumbNail === "" ? (
								<div className="mb-2">
									<label
										htmlFor="itemImage"
										className={`mt-[0.875rem] flex min-h-[9.375rem] w-full cursor-pointer flex-col items-center justify-center rounded-[0.25rem] bg-sub2-selected font-medium text-medium-slate-blue hover:bg-disabled-tekhelet sm:w-[19.563rem] ${
											errors.itemImageError.isError && "border border-danger"
										}`}
									>
										<Logo className="mb-2 h-20 w-[4.188rem]" />
										이미지 업로드
									</label>
									<input
										id="itemImage"
										type="file"
										className="hidden"
										accept=".jpg, .png"
										onChange={handleChangeThumbNailImage}
									/>
								</div>
							) : (
								<div className="relative">
									<img
										src={thumbNail}
										alt="이미지 미리보기"
										className="mt-[0.875rem] h-[9.375rem] w-full rounded-[0.25rem] object-contain sm:w-[19.563rem]"
									/>
									<button
										onClick={handleDeleteImage}
										type="button"
										className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:bg-black-100"
									>
										<DeleteImage />
									</button>
								</div>
							)}
							{errors.itemImageError.isError && (
								<ErrorMsg message={errors.itemImageError.errorMessage} />
							)}
						</div>
						<div className="mt-[0.875rem] flex w-full items-center sm:w-[19.563rem]">
							<label
								htmlFor="quantity"
								className="mr-[0.625rem] w-[2.813rem] text-black-800"
							>
								수량
							</label>
							<div className="flex border border-black-100">
								<button
									type="button"
									onClick={() => handleChangeQuantity("decrease")}
									className="flex h-10 w-10 items-center justify-center border-r border-black-100"
								>
									<Decrease />
								</button>
								<input
									type="number"
									id="quantity"
									value={itemFormValue.quantity}
									readOnly
									className="flex h-10 w-[3.375rem] items-center justify-center rounded-none text-center font-medium outline-none"
								/>
								<button
									type="button"
									onClick={() => handleChangeQuantity("increase")}
									className="flex h-10 w-10 items-center justify-center border-l border-black-100"
								>
									<Increase />
								</button>
							</div>
						</div>
						<div className="mt-[0.875rem] flex w-full flex-col sm:w-[19.563rem]">
							<div className="mb-2 flex">
								<label
									htmlFor="price"
									className="mr-[0.625rem] w-[2.813rem] text-black-800"
								>
									가격
								</label>
								<input
									type="text"
									id="price"
									className={`w-full rounded-none border-b pb-[0.625rem] outline-none ${
										errors.priceError.isError
											? "border-danger"
											: "border-black-100 focus:border-black-300"
									}`}
									value={replacePrice}
									onChange={handleChangeFormValue}
								/>
							</div>
							{errors.priceError.isError && (
								<ErrorMsg message={errors.priceError.errorMessage} />
							)}
						</div>
						<div className="mt-[0.875rem] flex w-full flex-col sm:w-[19.563rem]">
							<div className="mb-2 flex">
								<label
									htmlFor="content"
									className="mr-[0.625rem] w-[2.813rem] text-black-800"
								>
									내용
								</label>
								<textarea
									id="content"
									rows={8}
									className={`w-full grow resize-none rounded-none border-b outline-none ${
										errors.contentError.isError
											? "border-danger"
											: "border-black-100 focus:border-black-300"
									}`}
									value={itemFormValue.content}
									onChange={handleChangeFormValue}
								/>
							</div>
							{errors.contentError.isError && (
								<ErrorMsg message={errors.contentError.errorMessage} />
							)}
						</div>
					</div>
					<button
						type="submit"
						className="mx-auto mt-20 h-box-height w-full rounded-[0.25rem] bg-tekhelet font-bold text-white"
						onClick={handleClickEditBtn}
					>
						수정
					</button>
				</form>
			)}
		</div>
	);
};

export default EditItemForm;
