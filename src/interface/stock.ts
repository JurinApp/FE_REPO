export interface IStockTransaction {
	readonly tradeDate: string;
	readonly price: number;
	readonly amount: number;
}

export interface IStockBSHistory {
	buyList: IStockTransaction[];
	sellList: IStockTransaction[];
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

export interface IStockSpecData {
	readonly id: number;
	readonly name: string;
	readonly purchasePrice: number;
	readonly tax: number;
	readonly standard: string;
	readonly content: string;
}

export interface IStockPriceHistoryData {
	readonly dailyPrice: {
		readonly tradeDate: string;
		readonly price: number;
		readonly volume: number;
		readonly transactionAmount: number;
	}[];
}

export interface IBuyListHistoryData {
	readonly buyList: {
		readonly tradeDate: string;
		readonly amount: number;
		readonly price: number;
	}[];
}

export interface ISellListHistoryData {
	readonly sellList: {
		readonly tradeDate: string;
		readonly amount: number;
		readonly price: number;
	}[];
}

export interface IMyStock {
	readonly id: number;
	readonly name: string;
	readonly totalStockAmount: number;
	readonly daysRangeRate: string;
	readonly daysRangePrice: string;
}

export interface IMyStockResponseData {
	readonly limit: number;
	readonly offset: number;
	readonly count: number;
	readonly next: string | null;
	readonly previous: string | null;
	readonly results: IMyStock[];
}

// 학생권한 주식상세조회
export interface IStockInfo {
	readonly id: number;
	readonly name: string;
	readonly purchasePrice: number;
	readonly tax: number;
	readonly standard: string;
	readonly content: string;
}

export interface IUserPointInfo {
	readonly point: number;
	readonly totalStockAmount: number;
}

export interface IStockPriceInfo {
	readonly id: number;
	readonly name: string;
	readonly purchasePrice: number;
	readonly tax: number;
}

export interface IOrderExecution {
	readonly tradeDate: string;
	readonly name: string;
	readonly amount: number;
	readonly price: number;
	readonly daysRangeRate: string;
	readonly daysRangePrice: string;
	readonly tradeType: string;
}

export interface IOrderExecutionDate {
	readonly startDate: string;
	readonly endDate: string;
}
