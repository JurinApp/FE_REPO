import Spinner from "@/components/common/spinner/Spinner";
import useAxios from "@/hooks/useAxios";
import { TodayTradeFilterState } from "@/states/TodayTradeFilterState";
import { userRoleState } from "@/states/userRoleState";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import FilterButton from "./FilterButton";
import StockList from "./StockList";

interface TRADE_TYPE {
	readonly [key: string]: string;
}

const TRADE_TYPE: TRADE_TYPE = {
	all: "",
	buy: "?trade_type=1",
	sell: "?trade_type=2",
};

const TodayTradeContainer = () => {
	const userRole = useRecoilValue(userRoleState);
	const filterState = useRecoilValue(TodayTradeFilterState);
	const { channelId } = useParams();
	const { axiosData } = useAxios();
	const navigate = useNavigate();

	const getTodayTradeStocks = async () => {
		TRADE_TYPE;

		const response = await axiosData("useToken", {
			method: "GET",
			url: `/${userRole}s/api/v1/channels/${channelId}/stocks/trades/today${TRADE_TYPE[filterState]}`,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				return response.data.data.results;
			}

			if (status === 500) {
				alert("서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
				navigate("/mypage");
			}
		}
	};

	const { data, isLoading } = useQuery({
		queryKey: ["todayTradeStocks", channelId, filterState],
		queryFn: getTodayTradeStocks,
	});

	return (
		<div className="mx-auto w-full bg-btn-cancel-tekhelet px-4 sm:w-[24.536rem]">
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<FilterButton />
					<StockList stockList={data} />
				</>
			)}
		</div>
	);
};

export default TodayTradeContainer;
