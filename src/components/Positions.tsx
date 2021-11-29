import Modal from "./Modal";
import { useEffect, useState } from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { getAllPositions } from '../utils/api';
import { addTransactionToPosition, getSymbolPosition, parseNumber } from '../utils/utils';
import {SymbolPosition } from "../models/models";
import Table from "./Table";
import { Column } from "react-table";

const positionColumns: Column[] = [
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

export default function Positions() {

    const [ modal, setModal ] = useState(false);
    const [ symbol, setSymbol ] = useState("");
    const [ assetType, setAssetType ] = useState("");
    const [ date, setDate ] = useState("");
    const [ price, setPrice ] = useState<string | number>("");
    const [ quantity, setQuantity ] = useState<string | number>("");
    const [ positions, setPositions ] = useState<SymbolPosition[]>([]);

    async function addTransactionHandler() {
        console.log(symbol, date, price, quantity, positions);
        const symbolPosition = getSymbolPosition(symbol, positions) ?? {
            symbol,
            assetType,
            costBasis: 0,
            quantity: 0,
            totalCost: 0,
            transactionCount: 0
        } as SymbolPosition;

        await addTransactionToPosition(symbolPosition, parseNumber(price), parseNumber(quantity), date);

        setSymbol("");
        setDate("");
        setPrice("");
        setQuantity("");
        setModal(false);
        setSymbolPositions();
    }

    async function setSymbolPositions() {
        const positions  = await getAllPositions();
        setPositions(positions);
      }

    useEffect(() => {
        setSymbolPositions();
      }, []);

    return (
        <div className="App">
            <div>
                <Table columns={positionColumns} data={positions} />
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
                        <label htmlFor="input-asset" className="col-sm-2 col-form-label">Asset</label>
                        <div className="col-sm-10">
                        <input type="test" className="form-control" id="input-asset" 
                            onChange={(e) => setAssetType(e.target.value)} value={assetType}/>
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
    );
}