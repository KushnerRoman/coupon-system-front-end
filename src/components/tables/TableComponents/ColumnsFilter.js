import React from 'react'
import classes from '../../UI/table/TableLayer.module.css'

export const  ColumnsFilter =({column})=> {

    const {filterValue,setFilter} =column
  
    return (
       <span >
           <input value={filterValue || ''} onChange={e=>setFilter(e.target.value)} className={classes.columnSearch}/>
       </span>
    )
}
