import { IItemResponseData } from "@/interface/item";
import {
	allCheckItemsState,
	selectedItemState,
} from "@/states/selectedItemState";
import { ChangeEvent, useEffect, useRef } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";

interface IItemHeadingTitleProps {
	readonly responseData: IItemResponseData[];
}

const ItemHeadingTitle = ({ responseData }: IItemHeadingTitleProps) => {
	const setSelectedItems = useSetRecoilState(selectedItemState);
	const [isAllCheck, setIsAllCheck] = useRecoilState(allCheckItemsState);
	const resetIsAllCheck = useResetRecoilState(allCheckItemsState);
	const checkBoxRef = useRef<HTMLInputElement>(null);

	const flatMapItemList = responseData.flatMap((data) => {
		return data.results.flatMap((item) => {
			return item;
		});
	});

	const clickAllCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const isCheck = e.target.checked;

		if (isCheck) {
			const itemIdArr = flatMapItemList.map((item) => item.id);
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
				resetIsAllCheck();
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
					className="custom-checkBox cursor-pointer"
					checked={isAllCheck}
					onChange={clickAllCheckHandler}
				/>
				<label
					htmlFor="checkAll"
					className="ml-2 flex h-full cursor-pointer items-center text-sm"
				>
					전체 선택
				</label>
			</div>
			<h1 className="font-bold">
				아이템 <span>({flatMapItemList.length})</span>
			</h1>
		</div>
	);
};

export default ItemHeadingTitle;
