import useAxios from "@/hooks/useAxios";
import DeleteItemModal from "./DeleteItemModal";
import DeleteRegisterButton from "./DeleteRegisterButton";
import ItemHeadingTitle from "./ItemHeadingTitle";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/common/spinner/Spinner";

const ItemContainer = () => {
	const { axiosData } = useAxios();
	const { channelId } = useParams();

	const getItemsData = async () => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/teachers/api/v1/channels/${channelId}/items?limit=15`,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				return response.data.data.results;
			}

			if (status === 500) {
				alert("서버에 오류가 발생하였습니다. 잠시 후에 다시 시도하세요.");
			}
		}
	};

	const { data, isLoading } = useQuery({
		queryKey: ["items", channelId],
		queryFn: getItemsData,
	});

	return (
		<div className="relative mx-auto h-body-height w-full bg-btn-cancel-tekhelet px-4 sm:w-[24.563rem]">
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<ItemHeadingTitle itemList={data} />
					<ItemList itemList={data} />
					<DeleteRegisterButton />
					<DeleteItemModal />
				</>
			)}
		</div>
	);
};

export default ItemContainer;
