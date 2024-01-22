const DetailTradeStockInfo = () => {
	return (
		<div className="mx-auto h-[calc(100vh-30rem)] w-full overflow-y-auto rounded-[0.25rem] border border-black-100 bg-white pb-6 sm:w-[22.653rem]">
			<div className="px-6">
				<p className="mt-6 border-b border-black-100 pb-4 font-bold">
					의자 우선권
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
						<p className="ml-[0.625rem] font-medium">700</p>
						<p className="ml-[0.625rem] mt-[0.375rem] font-medium">0.3%</p>
						<p className="ml-[0.625rem] mt-[0.375rem]">가나다라마바사</p>
						<p className="ml-[0.625rem] mt-[0.375rem]">가나다라마바사</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailTradeStockInfo;
