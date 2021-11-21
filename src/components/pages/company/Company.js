import React,{useState,useEffect} from 'react'
import { Switch,Route } from 'react-router-dom'

import { COUPON_COLUMNS } from '../../tables/couponsColumns/couponColumns'
import CompanyService from '../../../servicies/companyService/CompanyService';
import AuthenticationService from '../../../servicies/authenticationService/AuthenticationService';
import { SortingTableNoSearch } from '../../tables/TableComponents/TableFiltredNoSearch';


export default function Company() {

    const [coupons,setCoupons]=useState([]);
    const [tableValues,setTableValues]=useState([]);
    const [companyEmail,setComapnyEmail]=useState(JSON.parse(localStorage.getItem('user')))

    const  companyPage=()=>{
        return(
            <Switch>
            <Route path='/company/coupons'>
                 <SortingTableNoSearch values={coupons}  columns={COUPON_COLUMNS} onActions={(setTableValues)}  onCloseModal={closeModal}/>
            </Route>

        </Switch>
        )
    
    }
    const closeModal=()=>{
        setTableValues([])
    }

    async function fetchCompanyCoupons(){
        let response= await CompanyService.getCompanyCoupons(companyEmail.username);
            setCoupons(response.data);
    }


    useEffect(() => {
        fetchCompanyCoupons()
        
    }, [])
    return (
        <div>
            {companyPage()}
            <button onClick={()=>console.log(coupons)}> Log</button>
        </div>
    )
}
