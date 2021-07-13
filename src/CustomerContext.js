import  { createContext, useState, useContext, useEffect } from 'react';
import axios from "axios";


const MaxContext = createContext();
const LoadingContext = createContext();
const ToggleMax = createContext();
const Customer = createContext();
const FilteredCustomer = createContext();
const SortContext = createContext();


export function useMax() {
	return useContext(MaxContext);
}
export function useToggleMax() {
	return useContext(ToggleMax);
}
export function useLoading() {
	return useContext(LoadingContext);
}
export function useCustomer() {
	return useContext(Customer);
}
export function useFilteredCustomer() {
	return useContext(FilteredCustomer);
}
export function useSortContext() {
	return useContext(SortContext);
}



export function CustomerProvider({ children }) {

	const [isMax, setMax] = useState(true);
	const [filteredCustomers, setFilteredCustomers] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [loading, setLoading] = useState(true)
	const [isSorting, setIsSorting] = useState(false);

	
	function sortOnClick() {

		setIsSorting(!isSorting);
		
		console.log('click kiye',isSorting)
		
	}
	useEffect(() => {

		axios.get('https://intense-tor-76305.herokuapp.com/merchants')
			.then((res) => {
				setLoading(false);
				let datas = res.data;
				setCustomers(res.data); 
				let requiredCustomer = [];
				datas.map(data => {
					
					requiredCustomer.push({
						id: data.id,
						firstname: data.firstname,
						lastname: data.lastname,
						avatarUrl: data.avatarUrl,
						email: data.email,
						phone: data.phone,
						hasPremium: data.hasPremium,
						bids: isMax ? (Math.max(...data.bids.map(bid => bid.amount)) === -Infinity 
										? 0 
										: Math.max(...data.bids.map(bid => bid.amount))
									) 
									:
									(Math.min(...data.bids.map(bid => bid.amount)) === Infinity 
										? 0 
										: Math.min(...data.bids.map(bid => bid.amount))
									),
			
					});
					
				});

				setFilteredCustomers(requiredCustomer);
				
			})
			.catch(function (error) {
			  console.log(error);
			})
	},[isMax])

	useEffect(() => {
		
		setFilteredCustomers(filteredCustomers.map(filteredCustomer => ({
			
			...filteredCustomer,
			sorted : 'sss',
			
		})))

		// setFilteredCustomers(filteredCustomers);
		
		console.log(filteredCustomers)
		if(isSorting === false) {
			setFilteredCustomers(filteredCustomers.sort((a,b) => a.bids - b.bids));
		}
		else {
			setFilteredCustomers(filteredCustomers.sort((a,b) => b.bids - a.bids));
		}
	},[isSorting])


	function toggleMaxBid() {
		setMax(prevIsMax => !prevIsMax);
	}

	return (
		
		<Customer.Provider value={customers}>
			<FilteredCustomer.Provider value={filteredCustomers}>
				<LoadingContext.Provider value={loading}>
					<SortContext.Provider value={sortOnClick}>
							<MaxContext.Provider value={isMax}>
								<ToggleMax.Provider value={toggleMaxBid}>
								{ children }
								</ToggleMax.Provider>
							</MaxContext.Provider>
					</SortContext.Provider>
				</LoadingContext.Provider>
			</FilteredCustomer.Provider>
		</Customer.Provider>
	);
};

