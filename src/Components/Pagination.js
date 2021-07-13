import React from 'react';

function Pagination({ totalCustomer, customerPerPage, changeCustomer}) {

	const pageNumbers = [];

	for(let i=1;i<Math.ceil(totalCustomer/customerPerPage);i++) {
		pageNumbers.push(i);
	}
	return (
		<nav aria-label="Page navigation example" className="mt-2">
			<ul class="pagination">
				
				{pageNumbers.map(number => (
					<li class="page-item">
						<a onClick={() => changeCustomer(number)} class="page-link" href="#!">{number}</a>
					</li>
				))}
				
				
				
			</ul>
		</nav>
	)
}

export default Pagination;
