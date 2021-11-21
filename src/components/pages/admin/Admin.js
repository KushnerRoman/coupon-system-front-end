import React,{useState,useEffect, useRef} from 'react'
import { Switch,Route } from 'react-router-dom'
import AdminService from '../../../servicies/adminService/AdminService';

import { SortingTableNoSearch } from '../../tables/TableComponents/TableFiltredNoSearch';
import {COMPANY_COLUMNS} from '../../tables/companyColumns/companyColumns'
import {CUSTOMER_COLUMNS} from '../../tables/customerColumns/customerColumns'
import history from '../../history';
import AdminSideBar from '../../header/sidebar/adminSidebar/AdminSideBar';
import Modal from 'react-modal'
import AdminAction from './actionsAdmin/AdminAction';
import AdminNewCompany from './actionsAdmin/adminCompanies/careateCompany/AdminNewCompany';
import AdminNewCustomer from './actionsAdmin/adminCustomers/newCustomer/AdminNewCustomer';
import { COUPON_COLUMNS } from '../../tables/couponsColumns/couponColumns';


export default function Admin() {
    const [companies,setCompanies]=useState([]);
    const [customers,setCustomers]=useState([]);
    const [coupons,setCoupons]=useState([]);
    const [tableValues,setTableValues]=useState([]);
    const [rowValues,setRowValues]=useState({})
    const [showAdminAction,setShowAdminAction]=useState(false);
    const userRef=useRef();

   


    const adminPages=()=>{
        return(
            

            <Switch>
            <Route path='/admin/companies'>
            <button className="btn btn-danger"  onClick={()=>history.push('/admin/newcompany')}>Create Company </button>{' '}
             <SortingTableNoSearch values={companies}  columns={COMPANY_COLUMNS} onActions={(setTableValues)}  onCloseModal={closeModal}/> 
             
            </Route>
            <Route path='/admin/coupons'>
            <button className="btn btn-danger"  onClick={()=>history.push('/admin/newcompany')}>Create Company </button>{' '}
             <SortingTableNoSearch values={coupons}  columns={COUPON_COLUMNS} onActions={(setTableValues)}  onCloseModal={closeModal}/> 
             
            </Route>
            <Route path='/admin/customers'>
            <button className="btn btn-danger"  onClick={()=>history.push('/admin/newcustomer')}>Create Customer </button>{' '}
                <SortingTableNoSearch values={customers}  columns={CUSTOMER_COLUMNS} onActions={(setTableValues)}  onCloseModal={closeModal}/>
                
            </Route>
            <Route path={['/admin/company/actions','/admin/customer/actions','/admin/coupons']}>
                    <AdminAction tableValues={tableValues} toOpen={true} ref={userRef} />
                </Route>
                
                <Route path='/admin/newcompany'>
                    <AdminNewCompany />
                </Route>
                <Route path='/admin/newcustomer'>
                    <AdminNewCustomer />
                </Route>
          
            
           
            
       

        </Switch>
        )
    
    }
    
    const closeModal=()=>{
        setTableValues([])
    }
     const adminActionsUser=()=>{
         if(history.location.pathname.includes('/admin/companies') && tableValues.length>0){

            history.push('/admin/company/actions')
             
         }if(history.location.pathname.includes('/admin/customers')&& tableValues.length>0){

             history.push('/admin/customer/actions')
         }if(history.location.pathname.includes('/admin/coupons')&& tableValues.length>0){

            history.push('/admin/customer/actions')
        }
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

    async function fetchCoupons(){
        let reposne = await AdminService.getAllCoupons();
                setCoupons(reposne.data)
    }

    useEffect(()=>{
                  fetchCompaniesData();
                  fetchCustomerData();  
                  fetchCoupons()    
            },[])
           


    return (
      <div className="subAction" >
    
         
          {adminActionsUser()}
          {adminPages()}
          
  
          
      </div>
    
    )
}
