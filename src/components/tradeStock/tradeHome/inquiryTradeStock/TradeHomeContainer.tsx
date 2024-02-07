import { useQuery } from "@tanstack/react-query";
import DeleteRegisterButton from "./DeleteRegisterButton";
import DeleteStocksModal from "./DeleteStocksModal";
import TradeHomeHeading from "./TradeHomeHeading";
import TradeStockList from "./TradeStockList";
import { useParams } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { userRoleState } from "@/states/userRoleState";
import { useRecoilValue } from "recoil";
import Spinner from "@/components/common/spinner/Spinner";

const TradeHomeContainer = () => {
	const userRole = useRecoilValue(userRoleState);
	const { channelId } = useParams();
	const { axiosData } = useAxios();

	const getTradeStocksData = async () => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/${userRole}s/api/v1/channels/${channelId}/stocks`,
		});

		if (response) {
			return response.data.data.results;
		}
	};

	const { data, isLoading } = useQuery({
		queryKey: ["stocks", channelId],
		queryFn: getTradeStocksData,
	});

	return (
		<div className="relative mx-auto h-[calc(100vh-10.7rem)] w-full bg-btn-cancel-tekhelet px-4 sm:w-[24.563rem]">
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<TradeHomeHeading stockList={data} />
					<TradeStockList stockList={data} />
					<DeleteRegisterButton />
					<DeleteStocksModal />
				</>
			)}
		</div>
	);
};

export default TradeHomeContainer;
