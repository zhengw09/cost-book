import './App.css';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { API } from 'aws-amplify';
import Table, { ColumnDefinition, TransactionRecord } from "./components/Table";
import Modal from "./components/Modal";
import { useEffect, useState } from 'react';
import { createTransaction } from "./graphql/mutations";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { listTransactions } from './graphql/queries';


Amplify.configure(config);

function App() {

    const [ modal, setModal ] = useState(false);
    const [ symbol, setSymbol ] = useState("");
    const [ date, setDate ] = useState("");
    const [ price, setPrice ] = useState<string | number>("");
    const [ quantity, setQuantity ] = useState<string | number>("");
    const [ transactions, setTransactions ] = useState<TransactionRecord[]>([]);

    async function createTransactionHandler() {
        console.log(symbol, date, price, quantity);
        const costBasis = parseNumber(price);
        const totalQuantity = parseNumber(quantity);
        const totalCost = costBasis * totalQuantity;
        await API.graphql({ 
            query: createTransaction, 
            variables: { input: {symbol, date, price, quantity, costBasis, totalQuantity, totalCost}},
         });
        setSymbol("");
        setDate("");
        setPrice("");
        setQuantity("");
        fetchTransactions();
        setModal(false);
    }

    function parseNumber(input: string | number): number {
        if (typeof(input) === "string") {
            return parseFloat(input);
        }
        return input
    }

    async function fetchTransactions() {
        const apiData = await API.graphql({ query: listTransactions });
        const transactionList: TransactionRecord[]  = apiData.data.listTransactions.items;
        console.log(transactionList);
        setTransactions(transactionList);
      }

    useEffect(() => {
        fetchTransactions();
      }, []);

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

    // const data: TransactionRecord[] = [
    //     {
    //         symbol: "TEST",
    //         date: "20211124",
    //         price: 10,
    //         quantity: 100,
    //         totalQuantity: 100,
    //         costBasis: 10,
    //         totalCost: 10,
    //     },
    //     {
    //         symbol: "TEST",
    //         date: "20211124",
    //         price: 10,
    //         quantity: 100,
    //         totalQuantity: 100,
    //         costBasis: 10,
    //         totalCost: 10,
    //     }
    // ];

    return (
        <div className="App">
            <div>
                <Table columns={columns} data={transactions} />
            </div>
            <div>
                <button onClick={() => setModal(true)}>Add</button>
            </div>
            <Modal show={modal}>

                <form>
                    <div className="form-group row">
                        <label htmlFor="input-symbol" className="col-sm-2 col-form-label">Symbol</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="input-symbol" 
                            onChange={(e) => setSymbol(e.target.value)} value={symbol}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="input-date" className="col-sm-2 col-form-label">Date</label>
                        <div className="col-sm-10">
                        <input type="date" className="form-control" id="input-date" 
                            onChange={(e) => setDate(e.target.value)} value={date}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="input-price" className="col-sm-2 col-form-label">Price</label>
                        <div className="col-sm-10">
                        <input type="number" className="form-control" id="input-price" step="0.00000001"
                            onChange={(e) => setPrice(e.target.value)} value={price}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="input-quantity" className="col-sm-2 col-form-label">Quantity</label>
                        <div className="col-sm-10">
                        <input type="number" className="form-control" id="input-quantity" step="0.00000001"
                            onChange={(e) => setQuantity(e.target.value)} value={quantity}/>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <input className="btn btn-primary" type="button" value="Submit" onClick={createTransactionHandler} />
                        <input className="btn btn-secondary" type="button" value="Cancel" onClick={() => setModal(false)} />
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default withAuthenticator(App);
