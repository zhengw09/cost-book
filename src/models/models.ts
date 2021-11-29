export type AssetType = "Stock" | "Crypto" | string;

export type SymbolPosition = {
    symbol: string;
    assetType: AssetType; 
    costBasis: number;
    quantity: number;
    totalCost: number;
    transactionCount: number;
}

export type TransactionRecord = {
    symbol: string;
    transactionId: number;
    date: string;
    price: number;
    quantity: number;
    currentCostBasis: number;
    currentTotalQuantity: number;
    currentTotalCost: number;
}