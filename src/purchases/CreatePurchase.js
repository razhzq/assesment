import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import useFetch from '../useFetch';
import Button from '@material-ui/core/Button'

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

const CreatePurchase = () => {

    const classes = useStyles();
    const { data: item, isPending, error } = useFetch('http://localhost:8000/api/item/?format=json'); 
    const [amount, setAmount] = useState('');
    
    

    
    const history = useHistory();
    const [age, setAge] = useState('');
    const handleChange = (event) => {
         setAge(event.target.value);
     };

    const handleSubmit = (e) => {
        e.preventDefault();
        const purchaseOrder = { item, amount };

        fetch('http://localhost:8000/api/purchaseorder/', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(purchaseOrder)
        }).then( () => {
            console.log('new purchase order added')
            history.push('/');
        })



    }


    return ( 
        <div className="create-purchase">
            { isPending && <div>Loading...</div>}
            { error && <div>{error}</div>}
            { item && (
            <div className="purchase-form">
            <h1>Create Purchase Order</h1>
            <form onSubmit={ handleSubmit }>
            <FormControl className={classes.margin}>
            <InputLabel id="demo-customized-select-label">Item</InputLabel>
            <Select
               labelId="demo-customized-select-label"
               id="demo-customized-select"
               value={age}
               onChange={handleChange}
               input={<BootstrapInput />}
             >
            <MenuItem value="">
               <em>None</em>
            </MenuItem>
              { item.map((item) => (
                  <MenuItem value={item.item_name} key={item.id}>{ item.item_name }</MenuItem>
              ))}
            </Select>
            </FormControl>
            <FormControl className={classes.margin}>
               <InputLabel htmlFor="demo-customized-textbox" value={item.item_price}>Price</InputLabel>
               <BootstrapInput id="demo-customized-textbox" />
            </FormControl>
            <FormControl className={classes.margin}>
               <InputLabel htmlFor="demo-customized-textbox" value={item.item_vendor}>Vendor</InputLabel>
               <BootstrapInput id="demo-customized-textbox" />
            </FormControl>
            <FormControl className={classes.margin}>
               <InputLabel htmlFor="demo-customized-textbox">Amount</InputLabel>
               <BootstrapInput id="demo-customized-textbox" />
            </FormControl>
            <FormControl className={classes.margin}>
               <InputLabel htmlFor="demo-customized-textbox">Total Amount</InputLabel>
               <BootstrapInput id="demo-customized-textbox" />
            </FormControl>
            <Button onClick={handleSubmit} variant="outlined" color="secondary">
                 Submit
            </Button>
            </form>
            </div>
            )}
        </div>
     );
}
 
export default CreatePurchase;