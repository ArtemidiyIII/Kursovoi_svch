import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import { Pagination } from 'react-bootstrap';


const RentPageNumber= observer(() => {
    const {rented_items} = useContext(Context)
    const pageCount =Math.ceil(rented_items.totalCountRentItems / rented_items.limitRentItems)
    const pages = []
    for (let i =0;i<pageCount; i++){
        pages.push(i+1)
    }
  return (
    <Pagination className='mt-3'>
      {pages.map(page=>
        <Pagination.Item key={page}
        active={rented_items.page === page} onClick={()=>rented_items.setPage(page)}> {page}
            </Pagination.Item>
      )}
    </Pagination>
  );
})

export default RentPageNumber;