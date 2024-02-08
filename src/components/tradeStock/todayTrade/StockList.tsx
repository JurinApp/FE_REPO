import { IStockItem } from "@/interface/tradeHome";
import StockItem from "./StockItem";

interface IStockListProps {
	readonly stockList: IStockItem[];
}

const StockList = ({ stockList }: IStockListProps) => {
	const isExists = stockList.length === 0;

	return (
		<div
			className={`mt-4 h-[calc(100vh-15.1rem)] overflow-y-auto ${
				isExists && "flex items-center justify-center"
			}`}
		>
			{isExists ? (
				<p className="text-black-700">거래중인 주식 상품이 없습니다.</p>
			) : (
				stockList.map((stockItem: IStockItem) => (
					<StockItem key={stockItem.id} stockItem={stockItem} />
				))
			)}
		</div>
	);
};

export default StockList;
