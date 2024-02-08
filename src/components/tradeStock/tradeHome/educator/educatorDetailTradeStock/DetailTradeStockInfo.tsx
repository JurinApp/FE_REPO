import Spinner from "@/components/common/spinner/Spinner";
import useAxios from "@/hooks/useAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const DetailTradeStockInfo = () => {
	const { channelId, stockId } = useParams();
	const { axiosData } = useAxios();
	const navigate = useNavigate();

	const getDetailStock = async () => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/teachers/api/v1/channels/${channelId}/stocks/${stockId}`,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				return response.data.data;
			}

			if (status === 404) {
				alert("존재하지 않는 주식거래 상품입니다.");
				navigate(`/${channelId}/trade/home`);
			}
		}
	};

	const { data, isLoading } = useQuery({
		queryKey: ["detailStock", channelId, stockId],
		queryFn: getDetailStock,
	});

	return (
		<div className="px-4 sm:px-0">
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<div className="mx-auto w-full rounded-[0.25rem] border border-black-100 bg-white pb-6 sm:w-[22.653rem]">
						<div className="max-h-[10rem] overflow-y-auto px-6 sm:max-h-56">
							<p className="mt-6 border-b border-black-100 pb-4 font-bold">
								{data.name}
							</p>
							<div className="mt-[0.875rem] flex">
								<div className="flex flex-col">
									<label className="w-[2.813rem] text-black-800">가격</label>
									<label className="mt-[0.375rem] w-[2.813rem] text-black-800">
										세금
									</label>
									<label className="mt-[0.375rem] w-[2.813rem] text-black-800">
										기준
									</label>
									<label className="mt-[0.375rem] w-[2.813rem] text-black-800">
										내용
									</label>
								</div>
								<div className="flex flex-col">
									<p className="ml-[0.625rem] font-medium">
										{data.purchasePrice}
									</p>
									<p className="ml-[0.625rem] mt-[0.375rem] font-medium">
										{data.tax}
									</p>
									<p className="ml-[0.625rem] mt-[0.375rem]">{data.standard}</p>
									<p className="ml-[0.625rem] mt-[0.375rem]">{data.content}</p>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default DetailTradeStockInfo;
