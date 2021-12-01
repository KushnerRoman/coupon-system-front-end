import React,{useState,useEffect, useContext} from 'react'
import { Switch,Route } from 'react-router-dom';
import MainStore from '../store/mainStore/MainStore';
import AuthContext from '../../../context/auth-context';
import CustomerService from '../../../servicies/customerService/CustomerService';
import AuthenticationService from '../../../servicies/authenticationService/AuthenticationService';
import { SortingTableNoSearch } from '../../tables/TableComponents/TableFiltredNoSearch';
import { COUPON_COLUMNS } from '../../tables/couponsColumns/couponColumns';
import axios from 'axios';
import Home from '../store/Home';

export default function Customer() {

    const [customerInfo,setCustomerInfo]=useState('');
    const [currentUserName,setCurrentUserName]=useState('');
    const [customerCoupons,setCustomerCoupons]=useState([]);
    const userContext=useContext(AuthContext);
    const [error,setError]=useState('');
    const [tableBalues,setTableValues]=useState([]);



 

const displayPage=()=>{
    return(
    <Switch>
        <Route path='/customer/coupons'>
            <SortingTableNoSearch values={customerCoupons} columns={COUPON_COLUMNS} onActions={(setTableValues)}  onCloseModal={closeModal}/>
        </Route>
        <Route path='/customer/profile'>

        </Route>

        <Route path='/customer/store'>
            <Home/>
        </Route>
    </Switch>)
} 
const closeModal=()=>{
    setTableValues([])
}

async function fetchCustomerInfo(){
    let response =await CustomerService.getCustoemrInfo(userContext.username);
        setCustomerInfo(response.data)
}

 async function fetchCoupons(){
     console.log(userContext.username)
    let response = await CustomerService.getCustomerCoupons(userContext.username); 
        setCustomerCoupons(response.data)
}
useEffect(  () => {
    
    
     
    fetchCustomerInfo();
    fetchCoupons();
        
      
    },[])

    return (

        <div>
            {displayPage()}
        </div>
        
    )
}
