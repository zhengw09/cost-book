import { SymbolPosition } from "../models/models";
import { addSymbolPosition, addTransaction, updateSymbolPosition } from "./api";

export function getSymbolPosition(symbol: string, positions: SymbolPosition[]): SymbolPosition | undefined {
    return positions.find((e) => e.symbol === symbol);
}

export function parseNumber(input: string | number): number {
    if (typeof(input) === "string") {
        return parseFloat(input);
    }
    return input
}

export async function addTransactionToPosition(symbolPosition: SymbolPosition, price: number, quantity: number, date: string) {
    symbolPosition.transactionCount += 1
    symbolPosition.quantity += quantity;
    symbolPosition.totalCost += quantity * price
    symbolPosition.costBasis = symbolPosition.totalCost / symbolPosition.quantity;

    if (symbolPosition.transactionCount === 1) {
        await addSymbolPosition(symbolPosition);
    } else {
        await updateSymbolPosition(symbolPosition);
    }
    await addTransaction({
        symbol: symbolPosition.symbol, 
        transactionId: symbolPosition.transactionCount, 
        date, 
        price: parseNumber(price), 
        quantity: parseNumber(quantity), 
        currentCostBasis: symbolPosition.costBasis, 
        currentTotalQuantity: symbolPosition.quantity, 
        currentTotalCost: symbolPosition.totalCost
    });
}