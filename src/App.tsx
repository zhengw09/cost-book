import './App.css';
import Amplify from 'aws-amplify';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    // Link
  } from "react-router-dom";
import config from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Positions from "./components/Positions";
import Transactions from "./components/Transactions";

Amplify.configure(config);

function App() {

    return (
        <Router>
        <div className="App">
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/symbol/:symbol" element={<Transactions/>} />
            <Route path="/" element={<Positions/>} />
          </Routes>
        </div>
      </Router>
    );
}

export default withAuthenticator(App);
