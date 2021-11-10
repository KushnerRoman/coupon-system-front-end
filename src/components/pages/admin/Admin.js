import React,{useState,useEffect, useRef} from 'react'
import { Switch,Route } from 'react-router-dom'
import AdminService from '../../../servicies/adminService/AdminService';
import { SortingTable } from '../../tables/TableComponents/TableFiltred'
import { SortingTableNoSearch } from '../../tables/customerColumns/TableFiltredNoSearch';
import {COMPANY_COLUMNS} from '../../tables/companyColumns/companyColumns'
import {CUSTOMER_COLUMNS} from '../../tables/customerColumns/customerColumns'
import history from '../../history';

import Modal from 'react-modal'
import AdminAction from './companiesAdmin/AdminAction';


export default function Admin() {
    const [companies,setCompanies]=useState([]);
    const [customers,setCustomers]=useState([]);
    const [tableValues,setTableValues]=useState([]);

    const [rowValues,setRowValues]=useState({})
    const [showAdminAction,setShowAdminAction]=useState(false);

   


    const adminTables=()=>{
        return(
            

            <Switch>
            <Route path='/admin/companies'>
           
             <SortingTableNoSearch values={companies}  columns={COMPANY_COLUMNS} onActions={(setTableValues)}  onCloseModal={closeModal}/> 
             
            </Route>
            <Route path='/admin/customers'>
               
                <SortingTable values={customers}  columns={CUSTOMER_COLUMNS} onDelete={handleActionsAdminCompany}/>
                
            </Route>
            <Switch>
                <Route path='/admin/actions'>
                    <AdminAction tableValues={tableValues} toOpen={true}  />
                </Route>
            </Switch>
           
            
       

        </Switch>
        )
    
    }
    
    const closeModal=()=>{
        setTableValues([])
    }

    const handleActionsAdminCompany = (e) => {
       
        console.log(e)
        if(setTableValues.length>0){
            setShowAdminAction(true)
             console.log( 'Table Values Array : '+tableValues)
             
        }     
    }
    
    async function fetchCustomerData(){
        let response = await AdminService.getAllCustomer();
        setCustomers(response.data)
    }
    async function fetchCompaniesData(){
        let response=await AdminService.getAllCompanies();
            setCompanies(response.data)
            
    }

    useEffect(()=>{
           
            
                    
                  fetchCompaniesData();
                  fetchCustomerData();
                  

                  
            },[])
           


    return (
      <div className="subAction" >
         
          {tableValues.length>0? <button className="btn btn-primary my-1"  onClick={()=>history.push('/admin/actions')}>Actions </button>:null} {' '} 
          <button className="btn btn-primary my-1"  onClick={()=>history.push('/admin/actions')}>Create Company </button>{' '}
          <button className="btn btn-primary my-1"  onClick={()=>history.push('/admin/actions')}>Create Customer </button>{' '}
          {adminTables()}
          
  
          
      </div>
    
    )
}
