import React,{useEffect,useState} from 'react'
import {Card,Button } from 'react-bootstrap';
import AuthenticationService from '../../../servicies/authenticationService/AuthenticationService';
import history from '../../history';

export default function CouponCard(props) {
    const [currentCoupon,setCurretnCoupon]=useState(props.coupon)
    const [isConnected,setIsConnected]=useState(false)



function connected(){
    if(AuthenticationService.getCurrentUser()){
        setIsConnected(true);
    }
}

useEffect(() => {
    
    console.log(currentCoupon)
    connected()

}, [])

    return (
        <div>
            <Card style={{width:'18rem' ,height:"25rem"}}> 
                <Card.Img height="100%" src={currentCoupon.image} />
                <Card.Body>
                    <Card.Title tag="h5">{currentCoupon.title}</Card.Title>
                    <Card.Text>About : {currentCoupon.description}</Card.Text>
                    <Card.Subtitle tag="h6" className="mb-2 text-muted"> Category : {currentCoupon.category} </Card.Subtitle>
                    <Card.Subtitle> Expire Date : {currentCoupon.endDate}</Card.Subtitle> 
                    <Card.Text>Price : {currentCoupon.price}</Card.Text>
                    {
                        isConnected?<Button type="submit" variant="primary" size="md" 
                            onClick={()=>props.buy(currentCoupon)}>Buy!</Button>:<Button type="submit" variant="primary" size="md" 
                            onClick={()=>history.push('/wellcom/login')}>Login!</Button>
                    }
                    <Button onClick={()=>console.log(currentCoupon)}>Log Coupon</Button>
                </Card.Body>
            </Card>
        </div>
    )
}
