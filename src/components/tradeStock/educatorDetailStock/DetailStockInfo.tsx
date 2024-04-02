import Spinner from "@/components/common/spinner/Spinner";
import useDetailStock from "@/hooks/queries/stock/useDetailStock";

const DetailStockInfo = () => {
	const { data, isLoading } = useDetailStock();

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
										{data.tax} %
									</p>
									<p className="ml-[0.625rem] mt-[0.375rem]">{data.standard}</p>
									<p className="ml-[0.625rem] mt-[0.375rem] whitespace-pre-wrap">
										{data.content}
									</p>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default DetailStockInfo;
