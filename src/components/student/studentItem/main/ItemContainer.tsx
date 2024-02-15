import { useState } from "react";
import Item from "./Item";
import ItemBuyModal from "./ItemBuyModal";
import { useSetRecoilState } from "recoil";
import { itemBuyModalState } from "@/states/confirmModalState";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

export interface IItem {
	id: string;
	title: string;
	amount: number;
	price: number;
	imageUrl: string;
}
const ItemContainer = () => {
	const setIsItemBuyModalOpen = useSetRecoilState(itemBuyModalState);
	const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
	const { axiosData } = useAxios();
	const handleModalOpen = (item: IItem) => {
		setSelectedItem(item);
		setIsItemBuyModalOpen(true);
	};

	const channelId = location.pathname.substring(1, 2);
	console.log(typeof channelId);
	const fetchItem = async () => {
		const apiUrl = `/students/api/v1/channels/${channelId}/items`;
		const response = await axiosData("useToken", {
			method: "GET",
			url: apiUrl,
		});
		if (response) {
			const status = response.status;
			if (status === 200) {
				return response.data.data;
			}
		}
	};

	const itemList = useQuery({
		queryKey: ["studentItem"],
		queryFn: fetchItem,
	});

	const isLoading = itemList.isLoading;
	console.log(isLoading);
	const buyItem = () => {
		console.log("구매");
	};
	return (
		<>
			<div className="relative mx-auto flex h-inTrade-height w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				<div className="mx-4 mt-6 grid h-[34.563rem] grid-cols-1 gap-x-2 gap-y-[0.875rem] overflow-scroll sm:grid-cols-3 xs:grid-cols-2">
					{!isLoading ? (
						itemList.data.results.map((item: IItem) => (
							<div key={item.id}>
								<div onClick={() => handleModalOpen(item)}>
									<Item
										id={item.id}
										title={item.title}
										price={item.price}
										imageUrl={item.imageUrl}
									/>
								</div>
							</div>
						))
					) : (
						<p>상품이 존재하지 않습니다.</p>
					)}
				</div>
			</div>
			{selectedItem && (
				<ItemBuyModal
					onConfirm={buyItem}
					item={selectedItem}
					channelId={channelId}
				/>
			)}
		</>
	);
};

export default ItemContainer;
