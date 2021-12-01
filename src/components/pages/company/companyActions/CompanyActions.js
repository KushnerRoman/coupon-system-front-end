import React, { useState,useEffect } from 'react'
import Modal from 'react-modal'
import {GrClose} from 'react-icons/gr'
import history from '../../../history'
import { Form } from 'react-bootstrap'
import UpdateCoupon from './updateCoupon/UpdateCoupon'
import CompanyService from '../../../../servicies/companyService/CompanyService'

Modal.setAppElement('#root')
export default function CompanyActions(props) {
    const [modalIsOpen,setModalIsOpen] =useState(false)
    const [coupons,setCoupons]=useState([])
    const [openUpdate,setOpenUpdate]=useState(false)
    const [currentCouponId,setCurrentCouponId]=useState('0');
    const [currentCoupon,setCurrentCoupon]=useState({});
    const [showSelectedCoupon,setShowSelectedCoupon]=useState(false)
    const [showSelected,setShowSelected]=useState(false)

    const modalStyle ={
    overlay: {
        position: 'absolute',
        marginRight: 'auto'
    },
    content: {
        position: 'absolute',
    }
}
useEffect(() => {
    setModalIsOpen(props.toOpen)
    setCoupons(props.coupons)
    
    
}, [])

const showUpdate=()=>{

    let coupon=coupons.filter((coupon)=>coupon.id==currentCouponId)
    
        if(currentCouponId!=='0'){
            
            return(
                <UpdateCoupon coupon={coupon} inUpdate={(setOpenUpdate)} refresh={()=>refreshContent()}/>
            )
        }

   
}
const refreshContent=()=>{
    props.refresh()
}
const couponArrToObj=(arr,key)=>{
   
    return arr.reduce((coupon,itme)=>({
        
            ...coupon,[itme[key]]:itme,
       
    }),{})
}
const handleChange=()=>{

    setShowSelectedCoupon(true)

}


const showSelectedCoupons=()=>{
    
        return(
            <div>
                <Form.Select size="sm" as="select" onChange={(e)=>setCurrentCouponId(e.target.value)} disabled={openUpdate}>
                    <option  key='0' value='0' > Select Coupon</option>
                        {
                         props.tableValues.map(
                             (id,index)=>{
                                 return(
                                     <option disabled={openUpdate} key={index} value={id}>{id}</option>
                                        
                                     )
                             }
                         )
                        }
                        
                </Form.Select>
            </div>
        )
    
}

const closeModal=()=>{

    setModalIsOpen(false)
    history.push('/company/coupons');
}
const handleDelete=()=>{
    CompanyService.deleteCoupon(currentCouponId).then(
        (response)=>{
            alert('Coupon was deleted')
            props.refresh()
            history.push('/company/coupons')
        }
    )
}
    return (
        <div>
            <Modal tyle={modalStyle} isOpen={modalIsOpen} shouldCloseOnEsc={false} shouldCloseOnOverlayClick={false} onRequestClose={()=>setModalIsOpen(false)}>
                <div>
                <button className="btn btn-danger my-1" onClick={closeModal}  ><GrClose/></button> { ' '}
                <button className="btn btn-primary my-1" onClick={()=>setShowSelected(true)}>Show Selected Coupons</button>{ ' '}
                <button  className="btn btn-danger my-1" onClick={()=>handleDelete()} hidden={!openUpdate}> Delete Coupon</button>
               
                {coupons.length>0? showSelectedCoupons():null}
                {showUpdate()}
                
                </div>
                
            </Modal>
        </div>
    )
}
