import { IUserPointInfo } from "@/interface/stock";
import PointLogo from "@assets/svg/point.svg?react";

interface MyPointProps {
	readonly userPointInfo: IUserPointInfo;
}

const MyPoint = ({ userPointInfo }: MyPointProps) => {
	return (
		<div>
			<div className="flex h-12 w-[14.875rem] flex-row items-center justify-between rounded border border-black-100 bg-white px-3">
				<p className="text-sm font-normal">내 포인트</p>
				<div className="flex items-center">
					<p className="mr-2 text-base font-bold">{userPointInfo.point}</p>
					<PointLogo />
				</div>
			</div>
			<div className="mt-1 flex  h-12 w-[14.875rem] flex-row items-center justify-between rounded border border-black-100 bg-white px-3">
				<p className="text-sm font-normal">보유중인 주식</p>
				<p className="text-base font-bold">
					{userPointInfo.totalStockAmount}
					<span className="ml-2 text-base font-bold">주</span>
				</p>
			</div>
		</div>
	);
};

export default MyPoint;
