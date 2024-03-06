import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import Spinner from "@/components/common/spinner/Spinner";
import useStockTradeInfoAndHistory from "@/hooks/queries/studentTradeDetail/useStockTradeInfoAndHistory";
import { selectedStockTabState } from "@/states/selectedTabState/selectedStockTabState";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import StockTab from "./StockTab";
import BuyStockContainer from "./buy/BuyStockContainer";
import StockDescriptionContainer from "./description/StockDescriptionContainer";
import StockOrderContainer from "./order/StockOrderContainer";
import SellStockContainer from "./sell/StockSellContainer";

const LearnerStockDetailContainer = () => {
	const selectedTab = useRecoilValue(selectedStockTabState);
	const { channelId } = useParams();
	const queries = useStockTradeInfoAndHistory();

	return (
		<div className="mx-auto w-full sm:w-[24.536rem]">
			{queries[0].isLoading ? (
				<Spinner />
			) : (
				<>
					<GoBackButton
						name={queries[0].data.stock.name}
						backNavigationPath={`/${channelId}/trade/home`}
					/>
					<StockTab />
					{selectedTab === "spec" && (
						<StockDescriptionContainer
							stockInfo={queries[0].data.stock}
							isLoading={queries[0].isLoading}
							stockPriceHistory={queries[0].data.dailyPrice}
						/>
					)}
					{selectedTab === "buy" && (
						<BuyStockContainer
							userPointInfo={queries[2].data.user}
							stockPriceInfo={queries[0].data.stock}
							stockBSHistory={queries[1].data}
						/>
					)}
					{selectedTab === "sell" && (
						<SellStockContainer
							userPointInfo={queries[2].data.user}
							stockPriceInfo={queries[0].data.stock}
							stockBSHistory={queries[1].data}
						/>
					)}
					{selectedTab === "order" && <StockOrderContainer />}
				</>
			)}
		</div>
	);
};

export default LearnerStockDetailContainer;
