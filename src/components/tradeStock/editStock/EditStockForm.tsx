import ErrorMsg from "@/components/common/errorMsg/ErrorMsg";
import Spinner from "@/components/common/spinner/Spinner";
import { REGISTER_TRADE_STOCK_SCHEMA } from "@/constants/formSchema";
import useAxios from "@/hooks/useAxios";
import { editTradeStockModalState } from "@/states/confirmModalState";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";

interface IEditTradeStockFormProps {
	readonly isEdit: boolean;
}

const EditStockForm = ({ isEdit }: IEditTradeStockFormProps) => {
	const setIsOpenModal = useSetRecoilState(editTradeStockModalState);
	const queryClient = useQueryClient();
	const { channelId, stockId } = useParams();
	const { axiosData, isFetchLoading } = useAxios();
	const navigate = useNavigate();
	const [replacePrice, setReplacePrice] = useState<string>("");

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		setError,
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

	const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const numericValue = parseFloat(value.replace(/,/g, ""));

		if (!isNaN(numericValue)) {
			console.log(numericValue);
			setValue("price", String(numericValue));
			setReplacePrice(numericValue.toLocaleString());
		} else {
			setValue("price", "0");
			setReplacePrice("");
		}
	};

	const getDetailStockData = async () => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/teachers/api/v1/channels/${channelId}/stocks/${stockId}`,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				const stockData = response.data.data;
				setValue("stockName", stockData.name);
				setValue("price", stockData.purchasePrice);
				setValue("tax", stockData.tax);
				setValue("standard", stockData.standard);
				setValue("content", stockData.content);
				setReplacePrice(stockData.purchasePrice.toLocaleString());
				return stockData;
			}

			if (status === 404) {
				alert("존재하지 않는 주식거래 상품입니다.");
				navigate(`/${channelId}/trade/home`);
			}
		}
	};

	const { isLoading } = useQuery({
		queryKey: ["editDetailStock", channelId, stockId],
		queryFn: getDetailStockData,
	});

	const editStockData = async () => {
		const response = await axiosData("useToken", {
			method: "PUT",
			url: `/teachers/api/v1/channels/${channelId}/stocks/${stockId}`,
			data: {
				name: getValues("stockName"),
				purchasePrice: 1111111,
				tax: getValues("tax"),
				standard: getValues("standard"),
				content: getValues("content"),
			},
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				alert("수정이 완료되었습니다.");
				queryClient.removeQueries({
					queryKey: ["editDetailStock", channelId, stockId],
				});
				queryClient.invalidateQueries({
					queryKey: ["detailStock", channelId, stockId],
				});
				queryClient.invalidateQueries({
					queryKey: ["stocks", channelId],
				});
				navigate(`/${channelId}/trade/stock/detail/${stockId}`);
			}

			if (status === 500) {
				alert("서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
			}
		}
	};

	const editStockMutation = useMutation({
		mutationKey: ["editStock"],
		mutationFn: editStockData,
	});

	const handleSubmitEditTradeStockForm = () => {
		editStockMutation.mutate();
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

	useEffect(() => {
		if (isEdit) {
			handleSubmitEditTradeStockForm();
		}
	}, [isEdit]);

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
			{isFetchLoading && <Spinner />}
		</>
	);
};

export default EditStockForm;
