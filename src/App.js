import React,{useState,useEffect} from 'react';
import './App.css';
import TableView from './Components/TableView';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import Pagination from './Components/Pagination';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useFilteredCustomer,useLoading } from './CustomerContext';
import Bids from "./Components/Bids";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 100,
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
  },
}));


function App() {

  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(5);
  const [customerId,setCustomerId] = useState("");
  const customers = useFilteredCustomer();
  const loading = useLoading();
  const lastIndexOfCustomer = currentPage * customersPerPage;
  const firstIndexOfCustomer = lastIndexOfCustomer - customersPerPage;
  const currentCustomers = customers.slice(firstIndexOfCustomer,lastIndexOfCustomer);

  const changeCustomer = (number) => {
    setCurrentPage(number);
  }

  const getId = (customerID) => {
    setCustomerId(customerID);
  }
  const classes = useStyles();
  console.log(customers);
  return (
    <Router>
    <div className="App container mt-5">
      <Switch>
        <Route exact path="/">
          <h1>TravClan Frontend Test</h1>
          { loading 
            ? 
            <div className="container">
              <h5 className="mt-3">loading customers .. </h5>
              <div className={classes.root}>
                
                <CircularProgress color="secondary" />
              </div>
            </div>
            :
            <>
              <TableView customers={currentCustomers} getId={getId}/>
              <Pagination totalCustomer={customers.length} customerPerPage={customersPerPage} changeCustomer={changeCustomer} /> 
            </>
          }
        </Route>
        <Route exact path={`/${customerId}`}>
          <Bids customerId={customerId} />
        </Route>
        </Switch>
      </div>
      
    </Router>
  );
}

export default App;
