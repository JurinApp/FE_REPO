import Spinner from "@/components/common/spinner/Spinner";
import useAxios from "@/hooks/useAxios";
import { itemBuyModalState } from "@/states/modalState/confirmModalState";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import ItemBuyModal from "./StudentItemBuyModal";
import StudentItemList from "./StudentItemList";

const ItemContainer = () => {
	const { channelId } = useParams();
	const { axiosData } = useAxios();
	const isItemBuyModalOpen = useRecoilValue(itemBuyModalState);

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

	const { data, isLoading } = useQuery({
		queryKey: ["studentItem", "home", channelId],
		queryFn: fetchItem,
	});

	return (
		<>
			<div className="relative mx-auto flex h-inTrade-height w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				{isLoading ? <Spinner /> : <StudentItemList data={data.results} />}
				{isItemBuyModalOpen && <ItemBuyModal />}
			</div>
		</>
	);
};

export default ItemContainer;
