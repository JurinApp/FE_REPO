import ErrorMsg from "@/components/common/errorMsg/ErrorMsg";
import Spinner from "@/components/common/spinner/Spinner";
import { REGISTER_TRADE_STOCK_SCHEMA } from "@/constants/formSchema";
import useEditStock from "@/hooks/mutations/stock/useEditStock";
import useEditDetailStock from "@/hooks/queries/stock/useEditDetailStock";
import { editTradeStockModalState } from "@/states/modalState/confirmModalState";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

interface IEditTradeStockFormProps {
	readonly isEdit: boolean;
}

const EditStockForm = ({ isEdit }: IEditTradeStockFormProps) => {
	const setIsOpenModal = useSetRecoilState(editTradeStockModalState);
	const [replacePrice, setReplacePrice] = useState<string>("");
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
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

	const { data, isLoading } = useEditDetailStock();
	const { mutate, isPending } = useEditStock();

	const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const numericValue = parseFloat(value.replace(/,/g, ""));

		if (!isNaN(numericValue)) {
			setValue("price", String(numericValue));
			setReplacePrice(numericValue.toLocaleString());
			if (errors.price) clearErrors("price");
		} else {
			setValue("price", "0");
			setError("price", {
				message: "가격 입력은 필수입니다.",
			});
			setReplacePrice("");
		}
	};

	const handleSubmitEditTradeStockForm = () => {
		const submitData = {
			name: getValues("stockName"),
			purchasePrice: getValues("price"),
			tax: getValues("tax"),
			standard: getValues("standard"),
			content: getValues("content"),
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

	const successGetStockData = () => {
		setValue("stockName", data.name);
		setValue("price", data.purchasePrice);
		setValue("tax", data.tax);
		setValue("standard", data.standard);
		setValue("content", data.content);
		setReplacePrice(data.purchasePrice.toLocaleString());
	};

	useEffect(() => {
		if (isEdit) {
			handleSubmitEditTradeStockForm();
		}
	}, [isEdit]);

	useEffect(() => {
		if (data) {
			successGetStockData();
		}
	}, [data]);

	return (
		<>
			<div className="h-[calc(100vh-7.125rem)] w-full px-4 pt-6">
				{isLoading ? (
					<Spinner />
				) : (
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
									className={`w-full rounded-none border-b border-black-100 pb-[0.625rem] font-bold outline-none placeholder:text-black-300 focus:border-black-800 ${
										errors.stockName && "border-danger"
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
										className={`w-full rounded-none border-b border-black-100 pb-[0.625rem] outline-none focus:border-black-800 ${
											errors.price && "border-danger"
										}`}
										id="replacePrice"
										disabled
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
										className={`w-full rounded-none border-b border-black-100 pb-[0.625rem] outline-none focus:border-black-800 ${
											errors.tax && "border-danger"
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
										type="text"
										className={`w-full rounded-none border-b border-black-100 pb-[0.625rem] outline-none focus:border-black-800 ${
											errors.standard && "border-danger"
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
										className={`w-full resize-none rounded-none border-b border-black-100 outline-none focus:border-black-800 ${
											errors.standard && "border-danger"
										}`}
										id="content"
										rows={5}
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
							수정
						</button>
					</form>
				)}
			</div>
			{isPending && <Spinner />}
		</>
	);
};

export default EditStockForm;
