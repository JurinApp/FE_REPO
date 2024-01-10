import Btn from "@assets/svg/btn_back.svg?react";
const StockHeader = () => {
	return (
		<header className="sticky top-0 z-[99] mx-auto h-[2.938rem] w-full  bg-white sm:w-[24.563rem]">
			<figure className="flex h-full items-center justify-between px-4">
				<div className="flex items-center">
					<Btn width={20} height={24} />
					<p className="ml-2 text-base font-bold text-black">
						{
							// 주식 이름
						}
						선생님의 몸무게
					</p>
				</div>
			</figure>
		</header>
	);
};

export default StockHeader;
