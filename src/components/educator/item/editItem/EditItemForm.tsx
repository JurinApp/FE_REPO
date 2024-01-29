import { ChangeEvent, FormEvent, useRef, useState } from "react";
import AddImage from "@assets/svg/addImage.svg?react";
import DeleteImage from "@assets/svg/deleteImage.svg?react";
import Logo from "@assets/svg/subColorLogo.svg?react";
import Increase from "@assets/svg/increaseIcon.svg?react";
import Decrease from "@assets/svg/decreaseIcon.svg?react";
import _ from "lodash";
import { useSetRecoilState } from "recoil";
import { editItemModalState } from "@/states/confirmModalState";

interface IFormValue {
	readonly itemName: string;
	readonly image: string;
	readonly quantity: number;
	readonly price: number;
	readonly content: string;
}

interface IThumbNailImg {
	readonly fileName: string;
	readonly thumbNailImg: string;
}

const EditItemForm = () => {
	const setIsOpenEditItemModal = useSetRecoilState(editItemModalState);
	const labelRef = useRef<HTMLLabelElement>(null);
	const [formValue, setFormValue] = useState<IFormValue>({
		itemName: "",
		image: "",
		quantity: 1,
		price: 0,
		content: "",
	});
	const [replacePrice, setReplacePrice] = useState<string>("");
	const [thumbNail, setThumbNail] = useState<IThumbNailImg>({
		fileName: "",
		thumbNailImg: "",
	});

	const addImageHandler = () => {
		if (labelRef.current) {
			labelRef.current.click();
		}
	};

	const deleteImageHandler = () => {
		setThumbNail({ fileName: "", thumbNailImg: "" });
	};

	const onChangeItemNameHandler = _.throttle((e) => {
		setFormValue({ ...formValue, itemName: e.target.value });
	}, 1000);

	const onChangeQuantityHandler = (type: string) => {
		if (type === "decrease") {
			if (formValue.quantity === 1) return;

			setFormValue({ ...formValue, quantity: formValue.quantity - 1 });
		}

		if (type === "increase") {
			setFormValue({ ...formValue, quantity: formValue.quantity + 1 });
		}
	};

	const onChangePriceHandler = _.throttle((e) => {
		const value = e.target.value;
		const numericValue = parseFloat(value.replace(/,/g, ""));

		if (!isNaN(numericValue)) {
			setFormValue({ ...formValue, price: numericValue });
			setReplacePrice(numericValue.toLocaleString());
		} else {
			setFormValue({ ...formValue, price: 0 });
			setReplacePrice("");
		}
	}, 1000);

	const onChangeContentHandler = _.throttle((e) => {
		setFormValue({ ...formValue, content: e.target.value });
	}, 1000);

	const changeThumbNailImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.files) {
			if (!e.currentTarget.files[0]) return;

			const thumbNailImgFile = e.currentTarget.files[0];
			const thumbNailImgFileName = e.currentTarget.files[0].name;
			const reader = new FileReader();
			reader.readAsDataURL(thumbNailImgFile);

			reader.onload = (e) => {
				if (e.target !== null) {
					setThumbNail({
						thumbNailImg: e.target.result as string,
						fileName: thumbNailImgFileName,
					});
				}
			};
		}
	};

	const submitEditItemFormHandler = (e: FormEvent) => {
		e.preventDefault();
		setIsOpenEditItemModal(true);
	};

	return (
		<div className="h-[calc(100vh-7.125rem)] w-full px-4 pt-6">
			<form>
				<div className="flex h-[calc(100vh-18rem)] flex-col items-center overflow-y-auto bg-white px-4 py-4">
					<div className="w-full sm:w-[19.563rem]">
						<label htmlFor="itemName" className="hidden">
							아이템명
						</label>
						<input
							type="text"
							id="itemName"
							className="w-full rounded-none border-b border-black-100 pb-4 font-bold outline-none placeholder:text-black-300 sm:w-[19.563rem]"
							placeholder="아이템명을 입력해주세요"
							onChange={onChangeItemNameHandler}
						/>
					</div>
					{thumbNail.thumbNailImg === "" ? (
						<div className="mt-[0.875rem] flex h-[9.375rem] w-full items-center justify-center rounded-[0.25rem] bg-sub2-selected sm:w-[19.563rem]">
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
								onClick={addImageHandler}
								className="ml-2 flex justify-start"
							>
								<AddImage />
							</button>
						) : (
							<button
								type="button"
								onClick={deleteImageHandler}
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
							onChange={changeThumbNailImgHandler}
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
								onClick={() => onChangeQuantityHandler("decrease")}
								className="flex h-10 w-10 items-center justify-center border-r border-black-100"
							>
								<Decrease />
							</button>
							<input
								type="number"
								id="quantity"
								value={formValue.quantity}
								className="flex h-10 w-[3.375rem] items-center justify-center rounded-none text-center font-medium outline-none"
							/>
							<button
								type="button"
								onClick={() => onChangeQuantityHandler("increase")}
								className="flex h-10 w-10 items-center justify-center border-l border-black-100"
							>
								<Increase />
							</button>
						</div>
					</div>
					<div className="mt-[0.875rem] flex w-full sm:w-[19.563rem]">
						<label
							htmlFor="price"
							className="mr-[0.625rem] w-[2.813rem] text-black-800"
						>
							가격
						</label>
						<input
							type="text"
							id="price"
							className="w-full rounded-none border-b border-black-100 pb-[0.625rem] outline-none"
							value={replacePrice}
							onChange={onChangePriceHandler}
						/>
					</div>
					<div className="mt-[0.875rem] flex w-full sm:w-[19.563rem]">
						<label
							htmlFor="content"
							className="mr-[0.625rem] w-[2.813rem] text-black-800"
						>
							내용
						</label>
						<textarea
							id="content"
							className="grow resize-none rounded-none border-b border-black-100 outline-none"
							onChange={onChangeContentHandler}
						/>
					</div>
				</div>
				<button
					type="submit"
					className="mx-auto mt-20 h-box-height w-full rounded-[0.25rem] bg-tekhelet font-bold text-white"
					onClick={submitEditItemFormHandler}
				>
					수정
				</button>
			</form>
		</div>
	);
};

export default EditItemForm;
