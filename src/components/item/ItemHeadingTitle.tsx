import { IItem } from "@/interface/item";
import { useRef } from "react";

interface IItemHeadingTitleProps {
	readonly itemList: IItem[];
}

const ItemHeadingTitle = ({ itemList }: IItemHeadingTitleProps) => {
	const checkBoxRef = useRef<HTMLInputElement>(null);

	return (
		<div className="flex h-12 w-full items-center justify-between pt-[0.625rem] text-black-800">
			<div className="flex items-center">
				<input
					ref={checkBoxRef}
					type="checkbox"
					id="checkAll"
					className="h-6 w-6"
					// checked={isAllCheck}
					// onChange={clickAllCheckHandler}
				/>
				<label
					htmlFor="checkAll"
					className="ml-2 flex h-full items-center text-sm"
				>
					전체 선택
				</label>
			</div>
			<h1 className="font-bold">
				아이템 <span>({itemList.length})</span>
			</h1>
		</div>
	);
};

export default ItemHeadingTitle;
