import { SymbolPosition } from "../components/Table";

export function newPosition(symbol: string, positions: SymbolPosition[]): boolean {
    return !positions.some((e) => e.symbol === symbol);
}

export function getSymbolPosition(symbol: string, positions: SymbolPosition[]): SymbolPosition | undefined {
    return positions.find((e) => e.symbol === symbol);
}