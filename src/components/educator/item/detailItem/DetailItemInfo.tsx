import Spinner from "@/components/common/spinner/Spinner";
import useDetailItem from "@/hooks/queries/item/useDetailItem";
import Logo from "@assets/svg/subColorLogo.svg?react";

const DetailItemInfo = () => {
	const { data, isLoading } = useDetailItem();

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<div className="px-4 sm:px-0">
					<div className="mx-auto h-[calc(100vh-20rem)] w-full overflow-y-auto rounded-[0.25rem] border border-black-100 bg-white pb-6 sm:w-[22.653rem]">
						<div className="px-4">
							<p className="mt-6 border-b border-black-800 pb-4 font-bold">
								의자 우선권
							</p>
							<div className="mt-[0.875rem] flex h-[9.375rem] items-center justify-center rounded-[0.25rem] bg-sub2-selected">
								{data.imageUrl === "" ? (
									<Logo className="h-20 w-[4.188rem]" />
								) : (
									<img
										src={data.imageUrl}
										alt="itemImage"
										className="h-[9.375rem] w-full bg-cover"
									/>
								)}
							</div>
							<div className="mt-[0.875rem] flex">
								<div className="flex flex-col">
									<label className="mt-[0.375rem] w-[2.813rem] text-black-800">
										수량
									</label>
									<label className="mt-[0.375rem] w-[2.813rem] text-black-800">
										가격
									</label>
									<label className="mt-[0.375rem] w-[2.813rem] text-black-800">
										내용
									</label>
								</div>
								<div className="flex flex-col">
									<p className="ml-[0.625rem] mt-[0.375rem] font-medium">
										{data.amount}
									</p>
									<p className="ml-[0.625rem] mt-[0.375rem] font-medium">
										{data.price}
									</p>
									<p className="ml-[0.625rem] mt-[0.375rem] whitespace-pre-wrap">
										{data.content}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default DetailItemInfo;
