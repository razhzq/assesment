import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useFetch from '../useFetch';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
  


const ItemTable = () => {

    const { data: item, isPending, error } = useFetch('http://localhost:8000/api/item/?format=json');    
    const classes = useStyles();


    return ( 

      <div className="item-list">
        { isPending && <div>Loading...</div>}
        { error && <div>{error}</div>}
        { item && (
           <TableContainer component={Paper}>
           <Table className={classes.table} aria-label="simple table">
             <TableHead>
               <TableRow>
                 <TableCell>ID</TableCell>
                 <TableCell align="right">Name</TableCell>
                 <TableCell align="right">Price</TableCell>
                 <TableCell align="right">Vendor</TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
               {item.map((item) => (
                 <TableRow key={item.id}>
                   <TableCell component="th" scope="row">
                     {item.id}
                   </TableCell>
                   <TableCell align="right">{item.item_name}</TableCell>
                   <TableCell align="right">{item.item_price}</TableCell>
                   <TableCell align="right">{item.item_vendor}</TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </TableContainer>
        )}
      </div>


        
     );
}
 
export default ItemTable;