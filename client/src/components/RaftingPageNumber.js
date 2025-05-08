import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import { Pagination } from 'react-bootstrap';


const RaftingPageNumber= observer(() => {
    const {raftings} = useContext(Context)
    const pageCount =Math.ceil(raftings.totalCountRaftings / raftings.limitRaftings)
    const pages = []
    for (let i =0;i<pageCount; i++){
        pages.push(i+1)
    }
  return (
    <Pagination className='mt-3'>
      {pages.map(page=>
        <Pagination.Item key={page}
        active={raftings.page === page} onClick={()=>raftings.setPage(page)}> {page}
            </Pagination.Item>
      )}
    </Pagination>
  );
})

export default RaftingPageNumber;