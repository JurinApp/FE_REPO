import { IItem } from "@/interface/item";
import {
	allCheckItemsState,
	selectedItemState,
} from "@/states/selectedItemState";
import { ChangeEvent, useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

interface IItemHeadingTitleProps {
	readonly itemList: IItem[];
}

const ItemHeadingTitle = ({ itemList }: IItemHeadingTitleProps) => {
	const setSelectedItems = useSetRecoilState(selectedItemState);
	const [isAllCheck, setIsAllCheck] = useRecoilState(allCheckItemsState);
	const checkBoxRef = useRef<HTMLInputElement>(null);

	const clickAllCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const isCheck = e.target.checked;

		if (isCheck) {
			const itemIdArr = itemList.map((item) => item.itemId);

			setSelectedItems(itemIdArr);
			setIsAllCheck(true);
		} else {
			setSelectedItems([]);
			setIsAllCheck(false);
		}
	};

	useEffect(() => {
		return () => {
			if (isAllCheck) {
				setIsAllCheck(false);
			}
		};
	}, []);

	return (
		<div className="flex h-12 w-full items-center justify-between pt-[0.625rem] text-black-800">
			<div className="flex items-center">
				<input
					ref={checkBoxRef}
					type="checkbox"
					id="checkAll"
					className="custom-checkBox"
					checked={isAllCheck}
					onChange={clickAllCheckHandler}
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
