interface IStockTransaction {
	readonly price: number;
	readonly quantity: number;
}

export interface IStockBSHistory {
	buy: IStockTransaction[];
	sell: IStockTransaction[];
}

export interface IStockItem {
	readonly id: string;
	readonly name: string;
	readonly daysRangeRate: number;
	readonly daysRangePrice: number;
}

export interface IStockHomeResponseData {
	readonly limit: number;
	readonly offset: number;
	readonly count: number;
	readonly next: string | null;
	readonly previous: string | null;
	readonly results: IStockItem[];
}

export interface ITodayTradeStockItem {
	readonly id: number;
	readonly amount: number;
	readonly name: string;
	readonly daysRangeRate: string;
	readonly daysRangePrice: string;
	readonly tradeType: string;
}

export interface ITodayTradeStockResponseData {
	readonly limit: number;
	readonly offset: number;
	readonly count: number;
	readonly next: string;
	readonly previous: string;
	readonly results: ITodayTradeStockItem[];
}
