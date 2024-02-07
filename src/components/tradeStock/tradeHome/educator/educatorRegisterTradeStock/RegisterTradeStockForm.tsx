import ErrorMsg from "@/components/common/errorMsg/ErrorMsg";
import { REGISTER_TRADE_STOCK_SCHEMA } from "@/constants/formSchema";
import useAxios from "@/hooks/useAxios";
import { registerTradeStockModalState } from "@/states/confirmModalState";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";

interface IRegisterTradeStockFormProps {
	readonly isRegister: boolean;
}

const RegisterTradeStockForm = ({
	isRegister,
}: IRegisterTradeStockFormProps) => {
	const { channelId } = useParams();
	const { axiosData } = useAxios();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		getValues,
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
	const setIsOpenModal = useSetRecoilState(registerTradeStockModalState);

	const registerTradeStock = async () => {
		const response = await axiosData("useToken", {
			method: "POST",
			url: `/teachers/api/v1/channels/${channelId}/stocks`,
			data: {
				name: getValues().stockName,
				purchasePrice: getValues().price,
				tax: getValues().tax,
				standard: getValues().standard,
				content: getValues().content,
			},
		});

		if (response) {
			const status = response.status;

			if (status === 201) {
				const stockId = response.data.data.id;

				alert("등록이 완료 되었습니다.");
				queryClient.invalidateQueries({ queryKey: ["stocks", channelId] });
				navigate(`/${channelId}/trade/stock/detail/${stockId}`);
			}

			if (status === 400) {
				alert("알맞은 형식으로 등록해주세요.");
			}

			if (status === 500) {
				alert("서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
			}
		}
	};

	const registerTradeStockMutation = useMutation({
		mutationKey: ["registerTradeStock"],
		mutationFn: registerTradeStock,
	});

	const handleSubmitRegisterTradeStockForm = () => {
		registerTradeStockMutation.mutate();
	};

	const handleClickRegisterBtn = () => {
		if (isValid) {
			setIsOpenModal(true);
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
									className={`w-full rounded-none border-b pb-[0.625rem] outline-none ${
										errors.price
											? "border-danger"
											: "border-black-100 focus:border-black-800"
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
									className={`w-full rounded-none border-b  pb-[0.625rem] outline-none ${
										errors.tax
											? "border-danger"
											: "border-black-100 focus:border-black-800"
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
										errors.standard
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
		</>
	);
};

export default RegisterTradeStockForm;
