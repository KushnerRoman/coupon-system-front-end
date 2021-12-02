import React, { useContext,useEffect,useState } from 'react'
import { Image } from 'react-bootstrap'
import './Coupon.css'
import AuthContext from '../../../../../context/auth-context'
import history from '../../../../history'
import Button from '../../../../UI/button/Button'

export default function Coupons(props) {
    const [curretnCoupon,setCurrentCoupon]=useState(props.coupon);
    const currentUser=useContext(AuthContext)
    const [loggedIn,setLoggedIn]=useState(false);

    useEffect(() => {
          if(currentUser.isUserLoggedIn){
              setLoggedIn(true)
          }  


        setCurrentCoupon(props.coupon)
        

    }, [props.coupon,currentUser])
    return (
        
            <div className="coupon-item">

                <Image className="coupon-item-image" src={props.coupon.image}/>
                <p className="title"> {props.coupon.title}</p>
                <h5 className="description"> {props.coupon.description}</h5>
                <h6 className="endDate"> {props.coupon.endDate}</h6>
                <h5 className="price"> {props.coupon.price}$</h5>
               
               
                {
                    !loggedIn?<button className="coupon-btn"
                                                 onClick={()=>history.push('/wellcom/login' )}>
                                Login!                          
                    </button>:
                    <Button  
                    onClick={()=>props.buy(curretnCoupon)}>
                        Buy!
                    </Button>
                }
                    
                    

            </div>
        
    )
}
