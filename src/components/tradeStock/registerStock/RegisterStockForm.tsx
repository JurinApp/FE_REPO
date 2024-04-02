import ErrorMsg from "@/components/common/errorMsg/ErrorMsg";
import Spinner from "@/components/common/spinner/Spinner";
import { REGISTER_TRADE_STOCK_SCHEMA } from "@/constants/formSchema";
import useRegisterStock from "@/hooks/mutations/stock/useRegisterStock";
import { registerTradeStockModalState } from "@/states/modalState/confirmModalState";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

interface IRegisterTradeStockFormProps {
	readonly isRegister: boolean;
}

const RegisterStockForm = ({ isRegister }: IRegisterTradeStockFormProps) => {
	const [replacePrice, setReplacePrice] = useState<string>("");
	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm({
		defaultValues: {
			stockName: "",
			price: "",
			tax: "",
			standard: "",
			content: "",
		},
		resolver: yupResolver(REGISTER_TRADE_STOCK_SCHEMA),
		mode: "onChange",
	});
	const setIsOpenModal = useSetRecoilState(registerTradeStockModalState);

	const { mutate, isPending } = useRegisterStock();

	const handleSubmitRegisterTradeStockForm = () => {
		const submitData = {
			name: getValues().stockName,
			purchasePrice: getValues().price,
			tax: getValues().tax,
			standard: Number(getValues().standard),
			content: getValues().content,
		};
		mutate(submitData);
	};

	const handleClickRegisterBtn = () => {
		const isValidTax = Number(getValues("tax")) <= 1;

		if (!isValidTax) {
			setError("tax", {
				message: "세금은 1% 이하 입력만 가능합니다.",
				type: "onChange",
			});
			return;
		}

		setIsOpenModal(true);
	};

	const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const numericValue = parseFloat(value.replace(/,/g, ""));

		if (!isNaN(numericValue)) {
			setValue("price", String(numericValue));
			setReplacePrice(numericValue.toLocaleString());
			if (errors.price) clearErrors("price");
		} else {
			setValue("price", "");
			setError("price", {
				message: "가격 입력은 필수입니다.",
			});
			setReplacePrice("");
		}
	};

	useEffect(() => {
		if (isRegister) {
			handleSubmitRegisterTradeStockForm();
		}
	}, [isRegister]);

	return (
		<>
			<div className="h-[calc(100vh-7.125rem)] w-full px-4 pt-6">
				<form onSubmit={handleSubmit(handleClickRegisterBtn)}>
					<div className="flex h-[calc(100vh-18rem)] flex-col items-center overflow-y-auto rounded-[0.25rem] border border-black-100 bg-white px-6">
						<div className="mb-[0.875rem] mt-6 w-full">
							<label htmlFor="stockName" hidden>
								게시글 제목
							</label>
							<input
								type="text"
								placeholder="상품명을 입력해주세요"
								id="stockName"
								className={`w-full rounded-none border-b pb-[0.625rem] font-bold outline-none placeholder:text-black-300 ${
									errors.stockName
										? "border-danger"
										: "border-black-100 focus:border-black-800"
								} mb-2`}
								{...register("stockName")}
							/>
							{errors.stockName && errors.stockName.message && (
								<ErrorMsg message={errors.stockName.message} />
							)}
						</div>
						<div className="mb-[0.875rem] flex w-full flex-col">
							<div className="mb-2 flex">
								<label
									htmlFor="price"
									className="mr-[0.625rem] w-[3rem] text-black-800"
								>
									가격
								</label>
								<input
									type="number"
									className="hidden"
									id="price"
									{...register("price")}
								/>
								<input
									type="text"
									className={`w-full rounded-none border-b pb-[0.625rem] outline-none ${
										errors.price
											? "border-danger"
											: "border-black-100 focus:border-black-800"
									}`}
									id="price"
									value={replacePrice}
									onChange={handleChangePrice}
								/>
								<p className="flex items-center pb-[0.625rem]">P</p>
							</div>
							{errors.price && errors.price.message && (
								<ErrorMsg message={errors.price.message} />
							)}
						</div>
						<div className="mb-[0.875rem] flex w-full flex-col">
							<div className="mb-2 flex">
								<label
									htmlFor="tax"
									className="mr-[0.625rem] w-[3rem] text-black-800"
								>
									세금
								</label>
								<input
									type="number"
									step="0.01"
									className={`w-full rounded-none border-b  pb-[0.625rem] outline-none ${
										errors.tax
											? "border-danger"
											: "border-black-100 focus:border-black-800"
									}`}
									id="tax"
									{...register("tax")}
								/>
								<p>%</p>
							</div>
							{errors.tax && errors.tax.message && (
								<ErrorMsg message={errors.tax.message} />
							)}
						</div>
						<div className="mb-[0.875rem] flex w-full flex-col">
							<div className="mb-2 flex">
								<label
									htmlFor="standard"
									className="mr-[0.625rem] w-[3rem] text-black-800"
								>
									기준
								</label>
								<input
									type="number"
									className={`w-full rounded-none border-b pb-[0.625rem] outline-none ${
										errors.standard
											? "border-danger"
											: "border-black-100 focus:border-black-800"
									}`}
									id="standard"
									{...register("standard")}
								/>
							</div>
							{errors.standard && errors.standard.message && (
								<ErrorMsg message={errors.standard.message} />
							)}
						</div>
						<div className="flex w-full flex-col">
							<div className="mb-2 flex">
								<label
									htmlFor="content"
									className="mr-[0.625rem] w-[3rem] text-black-800"
								>
									내용
								</label>
								<textarea
									className={`w-full resize-none rounded-none border-b outline-none ${
										errors.content
											? "border-danger"
											: "border-black-100 focus:border-black-800"
									}`}
									id="content"
									{...register("content")}
								/>
							</div>
							{errors.content && errors.content.message && (
								<ErrorMsg message={errors.content.message} />
							)}
						</div>
					</div>
					<button
						type="submit"
						className="absolute bottom-8 mx-auto h-box-height w-[91.5%] rounded-[0.25rem] bg-tekhelet font-bold text-white"
					>
						등록
					</button>
				</form>
			</div>
			{isPending && <Spinner />}
		</>
	);
};

export default RegisterStockForm;
