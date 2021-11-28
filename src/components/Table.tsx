import { ReactElement } from 'react';
import { useTable } from "react-table";

export type AssetType = "Stock" | "Crypto" | string;

export type SymbolPosition = {
    id: string;
    symbol: string;
    assetType?: AssetType; 
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

export type ColumnDefinition<T, K extends keyof T> = {
    Header: string;
    accessor: K;
}

export type TableProps<T> = {
    columns: ColumnDefinition<T, keyof T>[];
    data: T[];
}

export const positionColumns: ColumnDefinition<SymbolPosition, keyof SymbolPosition>[] = [
    {
        Header: "Symbol",
        accessor: "symbol"
    },
    {
        Header: "Type",
        accessor: "assetType"
    },
    {
        Header: "Cost Basis",
        accessor: "costBasis"
    },
    {
        Header: "Quantity",
        accessor: "quantity"
    },
    {
        Header: "Total Cost",
        accessor: "totalCost"
    }
]

export default function PositionsTable(props: TableProps<SymbolPosition>): ReactElement {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable(props);

      return (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
    );
}
