import { ReactElement } from 'react';
import { useTable } from "react-table";

export type TransactionRecord = {
    symbol: string;
    date: string;
    price: number;
    quantity: number;
    totalQuantity: number;
    costBasis: number;
    totalCost: number;
}

export type ColumnDefinition<T, K extends keyof T> = {
    Header: string;
    accessor: K;
}

export type TableProps = {
    columns: ColumnDefinition<TransactionRecord, keyof TransactionRecord>[];
    data: TransactionRecord[];
}

export default function Table(props: TableProps): ReactElement {

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
