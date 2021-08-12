import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Home from './Home'
import CreatePurchase from './purchases/CreatePurchase';
import ItemPage from './purchases/ItemPage';
import PurchaseForm from './purchases/PurchaseForm';
import PurchaseOrder from './purchases/PurchaseOrder';

function App() {
  return (
     <Router>
      <div className="App">
        <Header />
        <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/items">
            <ItemPage />
          </Route>
          <Route exact path="/purchaseorder">
             <PurchaseOrder />
          </Route>
          <Route exact path="/createpurchase">
             <PurchaseForm />
          </Route>

        </Switch>

        </div>
      
      </div>
     </Router>
    
  );
}

export default App;
