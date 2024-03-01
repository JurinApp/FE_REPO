import { IStudentItem } from "@/interface/item";
import { useMemo } from "react";
import StudentItemCard from "./StudentItemCard";

interface IItemList {
	readonly data: IStudentItem[];
}

const ItemList = ({ data }: IItemList) => {
	const isExistItems = useMemo(() => {
		return data.length !== 0;
	}, [data]);

	return (
		<div className="mx-auto mt-6 grid h-[34.563rem] grid-cols-1 gap-1 gap-y-[0.875rem] sm:grid-cols-3 xs:grid-cols-2">
			{isExistItems ? (
				data.map((item: IStudentItem) => (
					<StudentItemCard key={item.id} item={item} />
				))
			) : (
				<p>상품이 존재하지 않습니다.</p>
			)}
		</div>
	);
};

export default ItemList;
