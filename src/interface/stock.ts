interface IStockTransaction {
	readonly price: number;
	readonly quantity: number;
}

export interface IStockBSHistory {
	buy: IStockTransaction[];
	sell: IStockTransaction[];
}
