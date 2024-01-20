import { IStockBSHistory } from "@/interface/stock";

const StockOrderContainer = () => {
	const stockBSHistory: IStockBSHistory = {
		buy: [
			{ price: 1400, quantity: 1 },
			{ price: 1300, quantity: 3 },
			{ price: 1200, quantity: 2 },
			{ price: 1100, quantity: 3 },
			{ price: 1000, quantity: 5 },
			{ price: 900, quantity: 4 },
			{ price: 800, quantity: 3 },
		],
		sell: [
			{ price: 700, quantity: 1 },
			{ price: 600, quantity: 3 },
			{ price: 500, quantity: 2 },
			{ price: 450, quantity: 3 },
			{ price: 400, quantity: 5 },
			{ price: 300, quantity: 4 },
			{ price: 200, quantity: 3 },
		],
	};
	return (
		<>
			<div className="relative mx-auto h-inTrade-height w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]"></div>
		</>
	);
};

export default StockOrderContainer;
