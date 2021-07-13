import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useCustomer } from '../CustomerContext';

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
	a: {
	  textDecoration:'none',
	},
	spanStyle: {
	  flex: 0.6,
	},
});
function Bids({ customerId }) {

	
	const [bids,setBids] = useState([]);
	const customers = useCustomer();
	const classes = useStyles();
	
	useEffect(() => {
		let particularCustomer = (customers.filter(customer => (customer.id === customerId))).map(item => item.bids);
		setBids(particularCustomer[0]);
	},[customerId,customers])

	

	return (
		<div className="container">
		<h3 className="mt-3 mb-3">Bids</h3>
		<TableContainer component={Paper} aria-label="sticky table">
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell>Car Title</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bids.map((bid) => (
         
            <TableRow key={bids.id} >
              <TableCell className={classes.rowStyle}component="th" scope="row">
                <span className={classes.spanStyle}>{bid.carTitle}</span>
              </TableCell>
              <TableCell align="right">{bid.amount}</TableCell>
              <TableCell align="right">{bid.created}</TableCell>
            </TableRow>
      
          ))}
        </TableBody>
      </Table>
    </TableContainer>
	</div>
	)
}

export default Bids
