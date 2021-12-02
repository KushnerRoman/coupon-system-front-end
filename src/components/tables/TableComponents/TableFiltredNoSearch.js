import React,{useMemo,useEffect,useState, useContext} from 'react'

import {useTable,useSortBy,useFilters,usePagination,useRowSelect, useMountedLayoutEffect,useBlockLayout, useResizeColumns} from 'react-table'
import styled from 'styled-components'
import TableLayer from '../../UI/table/TableLayer'
import { GlobalFilter } from '../TableComponents/GlobalFilter'
import classes from '../../UI/table/TableLayer.module.css'
import { Checkbox } from '../TableComponents/CheckBox' 
import '../table.css'
import AuthContext from '../../../context/auth-context'

const Styles = styled.div`
  padding: 2rem;
  border-spacing: 0;
  border: 1px solid black;

  .table {
    
    display: inline-block;
   
 

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      overflow: hidden;
      text-overflow: ellipsis; 
      border: 1px solid #000000;
      ${'' /* In this example we use an absolutely position resizer,
       so this is required. */}
      position: relative;

      :last-child {
        border-right: 0;
        
      }

      .resizer {
        display: inline-block;
        background: blue;
        width: 10px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;

        &.isResizing {
          background: red;
        }
      }
    }
  }
`

export  const SortingTableNoSearch=(props)=> {
    const [values,setValues]=useState(props.values);
    const [alert,setAlert]=useState(false)
    const userAuth=useContext(AuthContext)
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
            
                },useFilters,useSortBy,usePagination,useRowSelect,useBlockLayout,useResizeColumns,hooks => {
                    hooks.visibleColumns.push(columns => [
                     

                      {
                        id: 'selection',
                        width:50,
                        maxWidth:60,
                           
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                          <div className={classes.checkbox}>
                              {
                            !userAuth.isUserLoggedIn?<Checkbox {...getToggleAllRowsSelectedProps()} />:null
                                } 
                            
                          </div>
                        ),

                        Cell: ({ row }) => (
                          <div  className={classes.checkbox}>
                              {
                                  !userAuth.isUserLoggedIn? <Checkbox {...row.getToggleRowSelectedProps()} /> : null
                              }
                           
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
 console.log(props.values)
    setValues(props.values)
    if(localStorage.getItem('user').includes('ROLE_Administrator')){
        setSelectedRowsValue(selectedFlatRows.map(row=>row.values.email))
    }if(localStorage.getItem('user').includes('ROLE_Company')){
        setSelectedRowsValue(selectedFlatRows.map(row=>row.values.id))
    }if(localStorage.getItem('user').includes('ROLE_Customer')){
        setSelectedRowsValue(selectedFlatRows.map(row=>row.values.id))
    }
    
   

    console.log(values)
    console.log(selectedRowsValue)
    // props.values,selectedFlatRows,setSelectedRowsValue
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
const actionBar=()=>{
    return(
        <div className={classes.actionRows}>
          
            <button  className="btn btn-secondary btn-sm "  onClick={()=>props.onActions(selectedRowsValue)}> Check Selected   </button> 
        </div>
        
    )

}

 



const searchTable=()=>{
   
        return(
           
              <>
                
            <div  >
                <button  className="btn btn-secondary btn-sm "  onClick={()=>console.log(selectedRowsValue)}> log ROW  </button> 
                
                {
                selectedFlatRows.length> 0?  actionBar() : null
            }
           
            <GlobalFilter /> 
              <div >

             
            <table className="table" {...getTableProps()} > 
                <td>Resize columns with the blue sticks</td>
                <thead >
                    {
                        headerGroups.map((headerGroup)=>(
                            <tr className="tr" {...headerGroup.getHeaderGroupProps() }  >
                                {
                                    headerGroup.headers.map(column=>(
                                        <th className='th' {...column.getHeaderProps(column.getSortByToggleProps)} scope="col">{column.render('Header')}
                                            <td >{column.canFilter? column.render('Filter'):null }</td>
                                            <td
                                                    {...column.getResizerProps()}
                                                    className={`resizer ${
                                                        column.isResizing ? 'isResizing' : ''
                                                    }`}
                                                    />
                 
                                            <span>
                                                {
                                                    column.isSorted?(column.isSortedDesc ? '🔽':'🔼'):''
                                                }
                                            </span>
                                        </th>
                                    ))
                                }
                                
                        </tr>
                        ))
                    }
                    
                </thead>
                <tbody  {...getTableBodyProps()}>
                    {
                        page.map((row,i)=>{
                            prepareRow(row)
                            return(
                                <tr {...row.getRowProps()} className="tr">
                                    {
                                        row.cells.map((cell)=>{
                                            return <td className="td" {...cell.getCellProps()} 
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
                
               
               
                  
          
                
           
              
            <td className={classes.pagesActions}>   
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
                        
                 </td>
             
                       
           
            </table>
            </div> 
        </div>
            </>
        )

      
    
   

}

    return (
  
            <Styles >
                {searchTable()}
            </Styles>
            
        
            
            
        
        
    )
   
}
