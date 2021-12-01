import React,{useContext, useEffect,useState,useMemo} from 'react'
import { Container, Row ,Col} from 'react-bootstrap';
import CustomerService  from '../../../../servicies/customerService/CustomerService'
import MainService from '../../../../servicies/MainService'
import CouponCard from '../../../UI/couponCard/CouponCard';
import AuthContext from '../../../../context/auth-context';
import Categories from '../categories/Categories';
import './MainStore.css'
import Coupons from './coupons/Coupons';
import history from '../../../history';

export default function  MainStore(props) {
const [coupons,setCoupons]=useState([]);
const [error,setError]=useState('');
const [companies,setCompanies]=useState([]);
const userContext = useContext(AuthContext)



async function fetchAllCompanies(){
  await  MainService.getAllCompanies().then(
            resposne=>
            {(setCompanies(resposne.data))},
            error=>
            {  
                setTimeout(()=>{setError(error.resposne)})
            }
    )
}
 async function fetchCoupons(){

    let response = await MainService.getAllCoupons();
        setCoupons(response.data)
 
}

useEffect(() => {
 

    fetchAllCompanies()
    fetchCoupons();
        
}, [])




const showCoupons=()=>{

    
    
    return(
        <div className="coupon-product">
        {coupons.map(coupon=>{
            return(
                // <Col key={coupon.id}>
                //     <CouponCard coupon={coupon} buy={(coupon)=>buyCoupon(coupon)}/>
                // </Col>
                
                    <Coupons coupon={coupon} buy={(coupon)=>buyCoupon(coupon) } key={coupon.id}/>

                
            )
        })}
    </div>
    )
}

const buyCoupon=(coupon)=>{ 
    console.log(coupon)
    CustomerService.buyCoupon(coupon).then(
        response=>{
            alert('coupon was added !')
        }
    )


}

    return (
        <div >
           
                <h2 className="coupon-title" >Popular Coupons</h2>
                <button className="coupon-btn" 
                    onClick={()=>console.log(coupons)}>
                       Cuurent 
                    </button>
            <Container>
                {showCoupons()}
            </Container>
        </div>
    )
}
