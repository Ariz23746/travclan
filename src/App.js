import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './App.css';
import TableView from './Components/TableView';
import { CustomerContext } from './CustomerContext';
import Pagination from './Components/Pagination';


function App() {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMax,setMax] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(5);
  

  
  useEffect(() => {

    axios.get('https://intense-tor-76305.herokuapp.com/merchants')
    .then((res) => {
      setLoading(false);
      setCustomers(res.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  },[])

  function toggleIsMax() {
    setMax(isMax => !isMax);
  }
  const lastIndexOfCustomer = currentPage * customersPerPage;
  const firstIndexOfCustomer = lastIndexOfCustomer - customersPerPage;
  const currentCustomers = customers.slice(firstIndexOfCustomer,lastIndexOfCustomer);

  const changeCustomer = (number) => {
    setCurrentPage(number);
  }
  return (

    <div className="App">
      <h1>TravClan Frontend Test</h1>
      { loading 
        ? 
          <h3>loading customers .. </h3>
        :
        <CustomerContext.Provider value={isMax}>
        <div className="App__ButtonContainer">
          <Button onClick={() => {
            // sortCustomers();
            
          }} variant="outlined" color="primary">
            Sort According to Bid Price
          </Button>
          <Button onClick={() => toggleIsMax()} variant="outlined" color="secondary">
            {isMax ? "Min Bid" : "Max Bid"}
          </Button>
        </div>
        <TableView customers={currentCustomers}/>
        <Pagination totalCustomer={customers.length} customerPerPage={customersPerPage} changeCustomer={changeCustomer} />
      </CustomerContext.Provider>

      }
      
    </div>
  );
}

export default App;
