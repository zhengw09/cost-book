import { API } from "aws-amplify";
import { SymbolPosition, TransactionRecord } from "../components/Table";
import { createSymbol, createTransaction, updateSymbol } from "../graphql/mutations";
import { listSymbols, listTransactions } from "../graphql/queries";

type AddSymbolPositionInput = {
    symbol: string;
    assetType: string;
    costBasis: number;
    quantity: number; 
    totalCost: number;
    transactionCount: number;
}

type UpdateSymbolPositionInput = {
    id: string;
    costBasis?: number;
    quantity?: number; 
    totalCost?: number;
    transactionCount?: number;
}

export async function addSymbolPosition(addSymbolPositionInput: AddSymbolPositionInput) {
    await API.graphql({ 
        query: createSymbol, 
        variables: { input: addSymbolPositionInput },
     });
}

export async function updateSymbolPosition(updateSymbolPositionInput: UpdateSymbolPositionInput) {
    await API.graphql({ 
        query: updateSymbol, 
        variables: { input: updateSymbolPositionInput },
     });
}

export async function addTransaction(transaction: TransactionRecord) {
    await API.graphql({ 
        query: createTransaction, 
        variables: { input: transaction},
     });
}

export async function getAllPositions(): Promise<SymbolPosition[]> {
    const apiData = await API.graphql({
        query: listSymbols
    }) as {
        data: {
            listSymbols: {
                items: SymbolPosition[];
            }
        }
    }
    return apiData.data.listSymbols.items;
} 

export async function getTransactionsBySymbol(symbol: string): Promise<TransactionRecord[]> {
    const filter = {
        symbol: {eq: symbol}
    };
    const apiData = await API.graphql({ 
        query: listTransactions, 
        variables: {filter} 
    }) as {
        data: {
            listTransactionsBySymbol: {
                items: TransactionRecord[];
            }
        }
    };
    return apiData.data.listTransactionsBySymbol.items;
}