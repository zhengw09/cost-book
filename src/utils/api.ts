import { API } from "aws-amplify";
import { SymbolPosition, TransactionRecord } from "../models/models";
import { createSymbol, createTransaction, updateSymbol } from "../graphql/mutations";
import { getSymbol, listSymbols, listTransactions } from "../graphql/queries";

export async function addSymbolPosition(symbolPosition: SymbolPosition) {
    await API.graphql({ 
        query: createSymbol, 
        variables: { input: symbolPosition },
     });
}

export async function updateSymbolPosition(symbolPosition: SymbolPosition) {
    await API.graphql({ 
        query: updateSymbol, 
        variables: { input: symbolPosition },
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

export async function getSymbolPosition(symbol?: string): Promise<SymbolPosition | null> {
    const apiData = await API.graphql({
        query: getSymbol,
        variables: {symbol}
    }) as {
        data: {
            getSymbol: SymbolPosition | null
        }
    };
    return apiData.data.getSymbol as SymbolPosition;
} 

export async function getTransactionsBySymbol(symbol?: string): Promise<TransactionRecord[]> {
    const filter = {
        symbol: {eq: symbol}
    };
    const apiData = await API.graphql({ 
        query: listTransactions, 
        variables: {filter} 
    }) as {
        data: {
            listTransactions: {
                items: TransactionRecord[];
            }
        }
    };
    return apiData.data.listTransactions.items;
}