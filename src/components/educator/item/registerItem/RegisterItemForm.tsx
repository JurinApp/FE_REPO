import { ChangeEvent, FormEvent, useRef, useState } from "react";
import AddImage from "@assets/svg/addImage.svg?react";
import DeleteImage from "@assets/svg/deleteImage.svg?react";
import Logo from "@assets/svg/subColorLogo.svg?react";
import Increase from "@assets/svg/increaseIcon.svg?react";
import Decrease from "@assets/svg/decreaseIcon.svg?react";
import _ from "lodash";
import { useSetRecoilState, useRecoilState } from "recoil";
import { registerItemModalState } from "@/states/confirmModalState";
import ErrorMsg from "@/components/common/errorMsg/ErrorMsg";
import { INITIAL_VALUE, registerItemForm } from "@/states/registerItemForm";
import { useEffect } from "react";

interface IErrors {
	readonly itemNameError: {
		isError: boolean;
		errorMessage: string;
	};
	readonly priceError: {
		isError: boolean;
		errorMessage: string;
	};
	readonly contentError: {
		isError: boolean;
		errorMessage: string;
	};
}

interface IThumbNailImg {
	readonly fileName: string;
	readonly thumbNailImg: string;
}

const RegisterItemForm = () => {
	const labelRef = useRef<HTMLLabelElement>(null);
	const setIsOpenModal = useSetRecoilState(registerItemModalState);
	const [itemFormValue, setItemFormValue] = useRecoilState(registerItemForm);
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
	});
	const [replacePrice, setReplacePrice] = useState<string>("");
	const [thumbNail, setThumbNail] = useState<IThumbNailImg>({
		fileName: "",
		thumbNailImg: "",
	});

	const handleAddImage = () => {
		if (labelRef.current) {
			labelRef.current.click();
		}
	};

	const handleDeleteImage = () => {
		setThumbNail({ fileName: "", thumbNailImg: "" });
	};

	const handleChangeThumbNailImage = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.files) {
			if (!e.currentTarget.files[0]) return;

			const imgFile = e.currentTarget.files[0];
			const imgFileName = e.currentTarget.files[0].name;

			setItemFormValue((prev) => ({ ...prev, imageFile: imgFile }));

			const reader = new FileReader();
			reader.readAsDataURL(imgFile);

			reader.onload = (e) => {
				if (e.target !== null) {
					setThumbNail({
						thumbNailImg: e.target.result as string,
						fileName: imgFileName,
					});
				}
			};
		}
	};

	const handleChangeQuantity = (type: string) => {
		if (type === "decrease") {
			if (itemFormValue.quantity === 1) return;

			setItemFormValue((prev) => ({
				...prev,
				quantity: itemFormValue.quantity - 1,
			}));
		}

		if (type === "increase") {
			setItemFormValue((prev) => ({
				...prev,
				quantity: itemFormValue.quantity + 1,
			}));
		}
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

	const handleChangeFormCheckValidation = (id: string, value: string) => {
		if (id === "itemName") {
			if (value.length === 0) {
				setErrors((prev) => ({
					...prev,
					itemNameError: {
						isError: true,
						errorMessage: "아이템명 입력은 필수입니다.",
					},
				}));
			} else {
				setErrors((prev) => ({
					...prev,
					itemNameError: {
						isError: false,
						errorMessage: "",
					},
				}));
			}
		}

		if (id === "price") {
			if (value.length === 0) {
				setErrors((prev) => ({
					...prev,
					priceError: {
						isError: true,
						errorMessage: "가격 입력은 필수입니다.",
					},
				}));
			} else {
				setErrors((prev) => ({
					...prev,
					priceError: {
						isError: false,
						errorMessage: "",
					},
				}));
			}
		}

		if (id === "content") {
			if (value.length === 0) {
				setErrors((prev) => ({
					...prev,
					contentError: {
						isError: true,
						errorMessage: "내용 입력은 필수입니다.",
					},
				}));
			} else {
				setErrors((prev) => ({
					...prev,
					contentError: {
						isError: false,
						errorMessage: "",
					},
				}));
			}
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

	const handleSubmitFormCheckValidation = () => {
		let isValidation: boolean = true;

		if (
			errors.itemNameError.isError ||
			errors.priceError.isError ||
			errors.contentError.isError
		) {
			isValidation = false;
		}

		if (itemFormValue.itemName.length === 0) {
			setErrors((prev) => ({
				...prev,
				itemNameError: {
					isError: true,
					errorMessage: "아이템명 입력은 필수입니다.",
				},
			}));
			isValidation = false;
		}

		if (itemFormValue.price === 0) {
			setErrors((prev) => ({
				...prev,
				priceError: {
					isError: true,
					errorMessage: "가격 입력은 필수입니다.",
				},
			}));
			isValidation = false;
		}

		if (itemFormValue.content.length === 0) {
			setErrors((prev) => ({
				...prev,
				contentError: {
					isError: true,
					errorMessage: "내용 입력은 필수입니다.",
				},
			}));
			isValidation = false;
		}

		return isValidation;
	};

	const handleClickRegisterBtn = (e: FormEvent) => {
		e.preventDefault();

		if (!handleSubmitFormCheckValidation()) return;
		setIsOpenModal(true);
	};

	useEffect(() => {
		return () => {
			setItemFormValue(INITIAL_VALUE);
		};
	}, []);

	return (
		<div className="h-[calc(100vh-7.125rem)] w-full px-4 pt-6">
			<form onSubmit={handleClickRegisterBtn}>
				<div className="flex h-[calc(100vh-18rem)] w-full flex-col items-center overflow-y-auto bg-white px-4 py-4 sm:px-0">
					<div className="mt-6 w-full sm:w-[19.563rem]">
						<label htmlFor="itemName" className="hidden">
							아이템명
						</label>
						<input
							type="text"
							id="itemName"
							className={`mb-2 w-full rounded-none border-b border-black-100 pb-4 font-bold outline-none placeholder:text-black-300 sm:w-[19.563rem] ${
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
					{thumbNail.thumbNailImg === "" ? (
						<div className="mt-[0.875rem] flex min-h-[9.375rem] w-full items-center justify-center rounded-[0.25rem] bg-sub2-selected sm:w-[19.563rem]">
							<Logo className="h-20 w-[4.188rem]" />
						</div>
					) : (
						<img
							src={thumbNail.thumbNailImg}
							alt="이미지 미리보기"
							className="mt-[0.875rem] h-[9.375rem] w-full rounded-[0.25rem] object-contain sm:w-[19.563rem]"
						/>
					)}

					<div className="mt-[1.125rem] flex w-full sm:w-[19.563rem]">
						<label
							htmlFor="image"
							ref={labelRef}
							className="mr-[0.625rem] w-[2.813rem] text-black-800"
						>
							이미지
						</label>
						<p className="h-[2.438rem] max-w-[14rem] grow truncate border-b border-black-100 pb-[0.625rem]">
							{thumbNail.fileName}
						</p>
						{thumbNail.thumbNailImg === "" ? (
							<button
								type="button"
								onClick={handleAddImage}
								className="ml-2 flex justify-start"
							>
								<AddImage />
							</button>
						) : (
							<button
								type="button"
								onClick={handleDeleteImage}
								className="ml-2 flex justify-start"
							>
								<DeleteImage />
							</button>
						)}
						<input
							id="image"
							type="file"
							accept=".jpg, .png"
							className="hidden"
							onChange={handleChangeThumbNailImage}
						/>
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
								className={`grow resize-none rounded-none border-b outline-none ${
									errors.contentError.isError
										? "border-danger"
										: "border-black-100 focus:border-black-300"
								}`}
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
				>
					등록
				</button>
			</form>
		</div>
	);
};

export default RegisterItemForm;
