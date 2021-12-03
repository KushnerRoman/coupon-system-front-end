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
import ErrorModal from '../../../UI/modal/errorModal/ErrorModal';

export default function  MainStore(props) {
const [coupons,setCoupons]=useState([]);
const [error,setError]=useState('');
const [companies,setCompanies]=useState([]);
const userContext = useContext(AuthContext)
const [showError,setShowError]=useState(false)


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
            console.log(response)
        },error=>{
            if(error.response.status===500){
                history.push('/customer/coupons')
            }if(error.response.status===400){
                alert('Error Check if coupon already axist or the date is expired ')
                props.message('Error Check if coupon already axist or the date is expired')
                props.showError();
                
            }
            
        }
    )


}

    return (
        <div >
            <div>
            {
                showError?<ErrorModal title="Error ! " message="Please choose right Role"  onClick={() => setShowError(false)}/>:null
            }
            </div>
                <h2 className="coupon-title" >Popular Coupons</h2>
            <Container>
           
                {showCoupons()}
            </Container>
        </div>
    )
}
