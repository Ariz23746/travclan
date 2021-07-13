import React,{useState,useEffect,createContext} from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './App.css';
import TableView from './Components/TableView';
import { CustomerContext } from './CustomerContext';


function App() {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMax,setMax] = useState(true);
  
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
  console.log(customers,isMax);

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
        <TableView customers={customers}/>
      </CustomerContext.Provider>

      }
      
    </div>
  );
}

export default App;
