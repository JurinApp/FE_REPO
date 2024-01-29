import ErrorMsg from "@/components/common/errorMsg/ErrorMsg";
import { REGISTER_TRADE_STOCK_SCHEMA } from "@/constants/formSchema";
import { registerTradeStockModalState } from "@/states/confirmModalState";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import RegisterConfirmTradeStockModal from "./RegisterConfirmTradeStockModal";
import { useState, useEffect } from "react";

const RegisterTradeStockForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
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
	const [isOpenRegisterTradeStockModal, setIsOpenRegisterTradeStockModal] =
		useRecoilState(registerTradeStockModalState);
	const [isRegister, setIsRegister] = useState<boolean>(false);

	const registerTradeStockHandler = () => {
		// TODO : API 개발 되면 코드 작성 예정, API Status Code 200이면 setIsRegister = false로 해주기
	};

	const onClickRegisterBtnHandler = () => {
		if (isValid) {
			setIsOpenRegisterTradeStockModal(true);
		}
	};

	useEffect(() => {
		if (isRegister) {
			registerTradeStockHandler();
		}
	}, [isRegister]);

	return (
		<>
			<div className="h-[calc(100vh-7.125rem)] w-full px-4 pt-6">
				<form onSubmit={handleSubmit(registerTradeStockHandler)}>
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
									className={`w-full rounded-none border-b border-black-100 pb-[0.625rem] outline-none focus:border-black-800 ${
										errors.price && "border-danger"
									}`}
									id="price"
									{...register("price")}
								/>
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
									className={`w-full rounded-none border-b border-black-100 pb-[0.625rem] outline-none focus:border-black-800 ${
										errors.tax && "border-danger"
									}`}
									id="tax"
									{...register("tax")}
								/>
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
						onClick={onClickRegisterBtnHandler}
					>
						등록
					</button>
				</form>
			</div>
			{isOpenRegisterTradeStockModal && (
				<RegisterConfirmTradeStockModal setIsRegister={setIsRegister} />
			)}
		</>
	);
};

export default RegisterTradeStockForm;
