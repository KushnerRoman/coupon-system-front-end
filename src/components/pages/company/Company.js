import React,{useState,useEffect} from 'react'
import { Switch,Route } from 'react-router-dom'
import AdminService from '../../../servicies/adminService/AdminService'
import { COUPON_COLUMNS } from '../../tables/couponsColumns/couponColumns'
import CompanyService from '../../../servicies/companyService/CompanyService';
import AuthenticationService from '../../../servicies/authenticationService/AuthenticationService';
import { SortingTableNoSearch } from '../../tables/TableComponents/TableFiltredNoSearch';
import history from '../../history';
import CompanyActions from './companyActions/CompanyActions';
import CreateCoupon from './companyActions/createCoupon/CreateCoupon';
import CompanyProfile from './companyActions/profile/CompanyProfile';
import Home from '../store/Home';


export default function Company() {

    const [coupons,setCoupons]=useState([]);
    const [tableValues,setTableValues]=useState([]);
    const [companyEmail,setComapnyEmail]=useState(JSON.parse(localStorage.getItem('user')))
    const [companyInfo,setCompanyInfo]=useState();
    const  companyPage=()=>{
        return(
            <Switch>
            <Route path='/company/coupons'>
                 <SortingTableNoSearch values={coupons}  columns={COUPON_COLUMNS} onActions={(setTableValues)}  onCloseModal={closeModal}/>
            </Route>
            <Route path='/company/actions'> 
                <CompanyActions tableValues={tableValues} toOpen={true} coupons={coupons} refresh={()=>fetchCompanyCoupons()}/>
            </Route>
            <Route path='/company/newCoupon'>
               <CreateCoupon companyId={companyInfo} />
            </Route>
            <Route path='/company/profile'>
               <CompanyProfile companyId={companyInfo} />
            </Route>
            <Route path='/company/home'>
            <Home/>
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
    const companyActions=()=>{
        if(tableValues.length>0){
            history.push('/company/actions')
        }
    }
    async function fetchCompanyInfo(){
        let response = await CompanyService.getCompanyInfo(companyEmail.username);
            setCompanyInfo(response.data);
    }
   

    useEffect(() => {
        fetchCompanyCoupons()
       
        fetchCompanyInfo()
        
    }, [])

    return (
        <div>
            <button className="btn btn-warning my-1" onClick={()=>history.push('/company/newCoupon')} >Create New Coupon</button>
           
            {companyActions()}
            {companyPage()}
            
        </div>
    )
}
