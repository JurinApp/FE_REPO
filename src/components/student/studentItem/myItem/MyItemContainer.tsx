import { useState } from "react";
import ItemFilterButton from "./ItemFilterButton";
import MyItem from "./MyItem";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { myItemFilterState } from "@/states/myItemFilterState";
import ItemUseModal from "./ItemUseModal";
import { itemUseModalState } from "@/states/confirmModalState";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

export interface IMyItemList {
	readonly id: number;
	readonly imageUrl: number;
	readonly isUsed: boolean;
	readonly price: number;
	readonly remainingAmount: number;
	readonly title: string;
}
const MyItemContainer = () => {
	const setIsItemUseModalOpen = useSetRecoilState(itemUseModalState);
	const [selectedItem, setSelectedItem] = useState<IMyItemList | null>(null);
	const { axiosData } = useAxios();
	const channelId = location.pathname.substring(1, 2);
	const fetchMyItem = async (is_used?: boolean) => {
		let apiUrl = `/students/api/v1/channels/${channelId}/items/mine`;
		if (is_used !== undefined) {
			apiUrl += `?is_used=${is_used}`;
		}
		const response = await axiosData("useToken", {
			method: "GET",
			url: apiUrl,
		});
		if (response) {
			const status = response.status;
			if (status === 200) {
				return response.data.data.results;
			}
		}
	};

	const myItemQuery = useQuery({
		queryKey: ["myItemList"],
		queryFn: () => fetchMyItem(),
	});

	const myItemList: IMyItemList[] = myItemQuery.data;

	const handleModalOpen = (item: IMyItemList) => {
		setSelectedItem(item);
		setIsItemUseModalOpen(true);
	};
	const filterState = useRecoilValue(myItemFilterState);
	const useItem = () => {
		console.log("사용");
	};
	return (
		<>
			<div className="relative mx-auto flex h-inTrade-height w-full flex-col bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				<ItemFilterButton />
				<div className="mx-4 mt-[1.5rem] grid h-[34.563rem] grid-cols-1 gap-x-2 gap-y-[0.875rem] overflow-scroll sm:grid-cols-3 xs:grid-cols-2">
					{myItemList &&
						myItemList
							.filter((item) => {
								if (filterState === "all") return true;
								if (filterState === "available")
									return item.remainingAmount > 0;
								if (filterState === "used") return item.remainingAmount === 0;
							})
							.map((item) => (
								<div key={item.id}>
									<div
										onClick={
											item.remainingAmount !== 0
												? () => handleModalOpen(item)
												: undefined
										}
									>
										<MyItem
											itemId={item.id}
											itemName={item.title}
											quantity={item.remainingAmount}
										/>
									</div>
								</div>
							))}
				</div>
			</div>
			{selectedItem && <ItemUseModal onConfirm={useItem} item={selectedItem} />}
		</>
	);
};

export default MyItemContainer;
