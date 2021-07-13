import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CustomerContext } from '../CustomerContext';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    backgroundColor: '#c2c2ce',
    color: 'white',
    fontWeight: 'bold',
  },
  rowStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  spanStyle: {
    flex: 0.6,
  },
});


function TableView({ customers }) {


  const classes = useStyles();
  const isMax = useContext(CustomerContext);
  return (
    
    <TableContainer component={Paper} stickyHeader aria-label="sticky table">
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell>Customer name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Premium</TableCell>
            <TableCell align="right">{isMax ? "Max Bid" : "Min Bid"}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            
            <TableRow key={customer.id}>
              <TableCell className={classes.rowStyle}component="th" scope="row">
                <span className={classes.spanStyle}>{customer.firstname}</span>
                <img alt={customer.lastname} className={classes.imgStyle} src={customer.avatarUrl} height="30" width="30" />
              </TableCell>
              <TableCell align="right">{customer.email}</TableCell>
              <TableCell align="right">{customer.phone}</TableCell>
              <TableCell align="right">{customer.hasPremium ? "True" : "False"}</TableCell>
              <TableCell align="right">{
                
                isMax ? 
                  (Math.max(...customer.bids.map(bid => bid.amount)) === -Infinity 
                    ? NaN 
                    : Math.max(...customer.bids.map(bid => bid.amount))
                  ) 
                  :
                  (Math.min(...customer.bids.map(bid => bid.amount)) === Infinity 
                    ? NaN 
                    : Math.min(...customer.bids.map(bid => bid.amount))
                  )
              }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  );
}

export default TableView;
