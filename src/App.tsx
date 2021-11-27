import React from 'react';
import './App.css';
import { useTable } from "react-table";
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';


Amplify.configure(config);

type TransactionRecord = {
    symbol: string;
    date: string;
    price: number;
    quantity: number;
    totalQuantity: number;
    costBasis: number;
    totalCost: number;
}

type ColumnDefinition<T, K extends keyof T> = {
    Header: string;
    accessor: K;
}

function App() {

    const columns: ColumnDefinition<TransactionRecord, keyof TransactionRecord>[] = [
        {
            Header: "Symbol",
            accessor: "symbol"
        },
        {
            Header: "Date",
            accessor: "date"
        },
        {
            Header: "Price",
            accessor: "price"
        },
        {
            Header: "Quantity",
            accessor: "quantity"
        },
        {
            Header: "Cost Basis",
            accessor: "costBasis"
        },
        {
            Header: "Total Quantity",
            accessor: "totalQuantity"
        },
        {
            Header: "Total Cost",
            accessor: "totalCost"
        }
    ]

    const data: TransactionRecord[] = [
        {
            symbol: "TEST",
            date: "20211124",
            price: 10,
            quantity: 100,
            totalQuantity: 100,
            costBasis: 10,
            totalCost: 10,
        },
        {
            symbol: "TEST",
            date: "20211124",
            price: 10,
            quantity: 100,
            totalQuantity: 100,
            costBasis: 10,
            totalCost: 10,
        }
    ];

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns,
        data,
      })

      return (
          <div>
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
        <AmplifySignOut />
        </div>
    );
}

export default withAuthenticator(App);
