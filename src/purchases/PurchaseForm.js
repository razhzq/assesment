
import { useState } from 'react';
import useFetch from '../useFetch';
import { useHistory } from 'react-router-dom';

const PurchaseForm = () => {

    
    const [item, setItem] = useState("");
    const [price, setPrice] = useState("");
    const [vendor, setVendor] = useState("");
    const [amount, setAmount] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [isPending, setIsPending] = useState(false);

    const history = useHistory();



    const handleSubmit = (e) => {
        e.preventDefault();

        setIsPending(true);

        const response = fetch('http://localhost:8000/api/purchaseorder/', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body : JSON.stringify({
                'item_name' : item,
                'item_vendor' : vendor,
                'total_amount' : amount,
                'total_price' : totalPrice, 
            })
        }).then( () => {
            console.log('new purchase order added')
            setIsPending(false);
            history.push('/');
        }).catch((err) => {
            console.log(err);
        });

        



    }


    return ( 
        <div className="purchase-form">
            <form onSubmit={handleSubmit}>
              <label>Item:</label>
              <input type="text"
                    required
                    value={item}
                    onChange={ (e) => setItem(e.target.value)}/>
              <label>Price:</label>
              <input type="number"
                    required
                    value={price}
                    onChange={ (e) => setPrice(e.target.value)}/>
              <label>Vendor:</label>
              <input type="text"
                    required
                    value={vendor}
                    onChange={ (e) => setVendor(e.target.value)}/>
              <label>Amount:</label>
              <input type="number"
                    required
                    value={amount}
                    onChange={ (e) => setAmount(e.target.value)}/>
              <label>Total Price:</label>
              <input type="number"
                    required
                    value={totalPrice}
                    onChange={ (e) => setTotalPrice(e.target.value)}/>

               <button>Submit</button>
            </form>
            
        </div>
     );
}
 
export default PurchaseForm;