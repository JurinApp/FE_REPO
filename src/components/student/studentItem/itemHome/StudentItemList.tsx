import { IStudentItem } from "@/interface/item";
import { useMemo } from "react";
import StudentItemCard from "./StudentItemCard";

interface IItemList {
	readonly data: IStudentItem[];
}

const StudentItemList = ({ data }: IItemList) => {
	const isExistItems = useMemo(() => {
		return data.length !== 0;
	}, [data]);

	return (
		<div
			className={`mt-10 h-[calc(100vh-16rem)] max-h-[40rem] overflow-y-auto ${
				!isExistItems && "flex items-center justify-center"
			}`}
		>
			{isExistItems ? (
				<div className="mx-4 grid grid-cols-1 gap-1 overflow-auto rounded-[0.25rem] sm:grid-cols-3 xs:grid-cols-2">
					{data.map((item: IStudentItem) => (
						<StudentItemCard key={item.id} item={item} />
					))}
				</div>
			) : (
				<p>상품이 존재하지 않습니다.</p>
			)}
		</div>
	);
};

export default StudentItemList;
