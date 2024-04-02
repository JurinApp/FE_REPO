import useMyPoint from "@/hooks/queries/item/useMyPoint";
import Spinner from "../common/spinner/Spinner";
import Right from "@assets/svg/right.svg?react";

const UserPoint = () => {
	const { data, isLoading } = useMyPoint();

	return (
		<div className="flex h-[3.25rem] w-full items-center justify-between bg-iris px-4 text-white">
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<p className="text-xs text-[rgba(255,255,255,0.8)]">내 포인트</p>
					<div className="flex items-center">
						<p className="mr-[0.325rem] text-2xl">{data}</p>
						<div className="mr-[0.875rem] flex h-6 w-6 items-center justify-center rounded-full bg-white font-bold text-iris">
							<p>P</p>
						</div>
						<Right />
					</div>
				</>
			)}
		</div>
	);
};

export default UserPoint;
