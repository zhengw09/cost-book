import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Column } from "react-table";
import { SymbolPosition, TransactionRecord } from "../models/models";
import { getSymbolPosition, getTransactionsBySymbol } from "../utils/api";
import { addTransactionToPosition, parseNumber } from "../utils/utils";
import Modal from "./Modal";
import Table from "./Table";

const transactionColumns: Column[] = [
    {
        Header: "Symbol",
        accessor: "symbol"
    },
    {
        Header: "ID",
        accessor: "transactionId"
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
        accessor: "currentCostBasis"
    },
    {
        Header: "Total Quantity",
        accessor: "currentTotalQuantity"
    },
    {
        Header: "Total Cost",
        accessor: "currentTotalCost"
    }
]

export default function Transactions() {

    const { symbol } = useParams();
    const [ modal, setModal ] = useState(false);
    const [ date, setDate ] = useState("");
    const [ price, setPrice ] = useState<string | number>("");
    const [ quantity, setQuantity ] = useState<string | number>("");
    const [ symbolPosition, setSymbolPosition ] = useState<SymbolPosition|null>(null);
    const [ transactions, setTransactions ] = useState<TransactionRecord[]>([]);

    async function addTransactionHandler() {
        if (!symbolPosition || !symbol) {
            return;
        }

        await addTransactionToPosition(symbolPosition, parseNumber(price), parseNumber(quantity), date);

        setDate("");
        setPrice("");
        setQuantity("");
        setModal(false);
        setSymbolPosition(symbolPosition);
        await setSymbolTransactions();
    }

    async function setSymbolTransactions() {
        const transactions = await getTransactionsBySymbol(symbol);
        setTransactions(transactions);
    }

    async function setCurrentSymbolPosition() {
        const position = await getSymbolPosition(symbol);
        setSymbolPosition(position);
        console.log(position);
    }

    useEffect(() => {
        setSymbolTransactions();
        setCurrentSymbolPosition();
      }, []);

    return (
        <div className="App">
            <div>
                <Table columns={transactionColumns} data={transactions} />
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
                            disabled value={symbol}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="input-asset" className="col-sm-2 col-form-label">Asset</label>
                        <div className="col-sm-10">
                        <input type="test" className="form-control" id="input-asset" 
                            disabled value={symbolPosition?.assetType}/>
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
                        <input className="btn btn-primary" type="button" value="Submit" onClick={addTransactionHandler} />
                        <input className="btn btn-secondary" type="button" value="Cancel" onClick={() => setModal(false)} />
                    </div>
                </form>
            </Modal>
        </div>
    )
}