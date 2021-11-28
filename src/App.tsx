import './App.css';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import PositionsTable, { SymbolPosition, positionColumns } from "./components/Table";
import Modal from "./components/Modal";
import { useEffect, useState } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { addSymbolPosition, addTransaction, getAllPositions, updateSymbolPosition } from './utils/api';
import { getSymbolPosition, newPosition } from './utils/utils';

Amplify.configure(config);

function App() {

    const [ modal, setModal ] = useState(false);
    const [ symbol, setSymbol ] = useState("");
    const [ assetType, setAssetType ] = useState("");
    const [ date, setDate ] = useState("");
    const [ price, setPrice ] = useState<string | number>("");
    const [ quantity, setQuantity ] = useState<string | number>("");
    const [ positions, setPositions ] = useState<SymbolPosition[]>([]);

    async function addTransactionHandler() {
        console.log(symbol, date, price, quantity, positions);
        let costBasis, totalQuantity, totalCost, transactionId;
        console.log(newPosition(symbol, positions));
        if (newPosition(symbol, positions)) {
            transactionId = 1;
            costBasis = parseNumber(price);
            totalQuantity = parseNumber(quantity);
            totalCost = costBasis * totalQuantity;
            await addSymbolPosition({symbol, assetType, costBasis, quantity: totalQuantity, totalCost, transactionCount: transactionId});
        } else {
            const symbolPosition = getSymbolPosition(symbol, positions)!;
            transactionId = symbolPosition.transactionCount + 1;
            totalQuantity = symbolPosition.quantity + parseNumber(quantity);
            totalCost = symbolPosition.totalCost + parseNumber(quantity) * parseNumber(price);
            costBasis = totalCost / totalQuantity;
            await updateSymbolPosition({id: symbolPosition.id, costBasis, quantity: totalQuantity, totalCost, transactionCount: transactionId});

        }

        await addTransaction({symbol, transactionId, date, price: parseNumber(price), quantity: parseNumber(quantity), currentCostBasis: costBasis, 
            currentTotalQuantity: totalQuantity, currentTotalCost: totalCost});

        setSymbol("");
        setDate("");
        setPrice("");
        setQuantity("");
        setModal(false);
        setSymbolPositions();
    }

    function parseNumber(input: string | number): number {
        if (typeof(input) === "string") {
            return parseFloat(input);
        }
        return input
    }

    async function setSymbolPositions() {
        const positions  = await getAllPositions();
        console.log(positions);
        setPositions(positions);
      }

    useEffect(() => {
        setSymbolPositions();
      }, []);

    return (
        <div className="App">
            <div>
                <PositionsTable columns={positionColumns} data={positions} />
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

export default withAuthenticator(App);
