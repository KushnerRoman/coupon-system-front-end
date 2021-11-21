import React,{useMemo,useEffect,useState} from 'react'

import {useTable,useSortBy,useFilters,usePagination,useRowSelect, useMountedLayoutEffect, useResizeColumns} from 'react-table'

import TableLayer from '../../UI/table/TableLayer'
import { GlobalFilter } from '../TableComponents/GlobalFilter'
import classes from '../../UI/table/TableLayer.module.css'
import { Checkbox } from '../TableComponents/CheckBox' 

export  const SortingTableNoSearch=(props)=> {
    const [values,setValues]=useState(props.values);
    const [alert,setAlert]=useState(false)
    const [selectedRowsValue,setSelectedRowsValue]=useState([])
    const columns=useMemo(()=>props.columns,[] )
    const data=useMemo(()=>values,[values])
    
  
        
const {getTableProps,getTableBodyProps,headerGroups,rows ,page,nextPage,previousPage,canNextPage,canPreviousPage,
        pageOptions,prepareRow,gotoPage,pageCount,setPageSize,setGlobalFilter,selectedFlatRows,state}=useTable({
            columns,
            data,
            selectedRowsValue,
            initialState:{pageIndex : 0,
                pageSize:5,
               
              }
            
                },useFilters,useSortBy,usePagination,useRowSelect,useResizeColumns,hooks => {
                    hooks.visibleColumns.push(columns => [

                      {
                        id: 'selection',

                        Header: ({ getToggleAllRowsSelectedProps }) => (
                          <div>
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                          </div>
                        ),

                        Cell: ({ row }) => (
                          <div>
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                          </div>
                        ),
                      },
                      ...columns,
                    ])
                  });


 const firstPageRows =rows.slice(0,5);        
 const {globalFilter} = state   
 const {pageIndex,pageSize} = state
 const {selectedRowIds} =state



 useMountedLayoutEffect(() => {
 
    setValues(props.values)
    setSelectedRowsValue(selectedFlatRows.map(row=>row.values.id))
   

    console.log(values)
    console.log(selectedRowsValue)

},[props.values,selectedFlatRows,setSelectedRowsValue] )


// useEffect(() => {
 
//     setValues(props.values)
//     setSelectedRowsValue(selectedFlatRows.map(row=>row.values.email))
   

//     console.log(values)
//     console.log(selectedRowsValue)

// },[props.values,selectedFlatRows,setSelectedRowsValue] )



const getCellValue = () => {
   
    //console.log(selectedRowsValue)
           
      
}
const actionAdminBar=()=>{
    return(
        <div className={classes.actionRows}>
          
            <button  className="btn btn-secondary btn-sm "  onClick={()=>props.onActions(selectedRowsValue)}> Check Selected   </button> 
            

        </div>
        
    )

}

 



const searchTable=()=>{
   
        return(
           
              
                
            <TableLayer >
                <button  className="btn btn-secondary btn-sm "  onClick={()=>console.log(selectedRowsValue)}> log ROW  </button> 
                
                {
                selectedFlatRows.length> 0?  actionAdminBar() : null
            }
           
            <GlobalFilter /> 
              
            <table {...getTableProps()} className="table table-bordered table-hover table-dark">
                <thead>
                    {
                        headerGroups.map((headerGroup)=>(
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column=>(
                                        <th {...column.getHeaderProps(column.getSortByToggleProps)} scope="col">{column.render('Header')}
                                            <div>{column.canFilter? column.render('Filter'):null }</div>
                                            <div
                                                    {...column.getResizerProps()}
                                                    className={`resizer ${
                                                        column.isResizing ? 'isResizing' : ''
                                                    }`}
                                                    />
                 
                                            <span>
                                                {
                                                    column.isSorted?(column.isSortedDesc ? 'B':'A'):''
                                                }
                                            </span>
                                        </th>
                                    ))
                                }
                                
                        </tr>
                        ))
                    }
                    
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map(row=>{
                            prepareRow(row)
                            return(
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell)=>{
                                            return <td {...cell.getCellProps()} className="bg-primary" 
                                            >
                                                {cell.render('Cell')}
                                            </td>
                                        })
                                    }
                                         
                                 </tr>
                            )
                        })
                    }
                   
    
                </tbody>  
                
               
               
                  
          
                
            </table> 
              
            <div className={classes.pagesActions}>   
                    <select value={pageSize} onChange={e=>setPageSize(Number(e.target.value))}>
                        {
                            [5,10,20].map((pageSize)=>(
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))
                        } 
                        </select>
                    <span>Page {' '}</span>
                    <span>Go to page : {' '} </span>
                    <input type='number' defaultValue={pageIndex+1} onChange={e=>{
                        const pageNumber =e.target.value ? Number(e.target.value) -1 : 0
                        gotoPage(pageNumber) 
                    }}style={{width :'50px'}} /> 
                    <strong>{' '}{pageIndex+1} of {pageOptions.length}{' '} </strong>                
                    <button className={classes.button} onClick={()=>gotoPage(0)} disabled={!previousPage}>{'<<'}</button>                                    
                    <button className={classes.button} onClick={()=>previousPage()} disabled={!canPreviousPage}> Previous</button>                          
                    <button className={classes.button} onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
                    <button className={classes.button} onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button>
                        
                 </div>
             
                       
           
            </TableLayer>
           
           
        )

      
    
   

}

    return (
  
        <div>
            {searchTable()}
        
            
            
        </div>
        
    )
   
}
