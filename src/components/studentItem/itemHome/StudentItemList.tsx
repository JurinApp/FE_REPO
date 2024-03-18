import ObserveTarget from "@/components/common/observer/ObserveTarget";
import IntersectSpinner from "@/components/common/spinner/IntersectSpinner";
import { IItemResponseData, IExtendItem } from "@/interface/item";
import { RefObject, useMemo } from "react";
import StudentItemCard from "./StudentItemCard";

interface IItemList {
	readonly responseData: IItemResponseData[];
	readonly isFetching: boolean;
	readonly observeTargetRef: RefObject<HTMLDivElement>;
}

const StudentItemList = ({
	responseData,
	isFetching,
	observeTargetRef,
}: IItemList) => {
	const flatMapItemList = responseData.flatMap((data) => {
		return data.results.flatMap((item) => {
			return item;
		});
	});

	const isExistItems = useMemo(() => {
		return flatMapItemList.length !== 0;
	}, [flatMapItemList]);

	return (
		<div
			className={`mt-6 h-[calc(100vh-16rem)] max-h-[40rem] overflow-y-auto ${
				!isExistItems && "mx-auto flex items-center justify-center"
			}`}
		>
			{isExistItems ? (
				<div className="mx-4 grid grid-cols-1 gap-1 overflow-auto rounded-[0.25rem] sm:grid-cols-3 xs:grid-cols-2">
					{flatMapItemList.map((item: IExtendItem) => (
						<StudentItemCard key={item.id} item={item} />
					))}
					{isFetching ? (
						<IntersectSpinner />
					) : (
						<ObserveTarget observeTargetRef={observeTargetRef} />
					)}
				</div>
			) : (
				<p>상품이 존재하지 않습니다.</p>
			)}
		</div>
	);
};

export default StudentItemList;
