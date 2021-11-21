import React, { useState,useEffect,useRef } from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import  './AdminActions.css'
import AdminService from '../../../../servicies/adminService/AdminService'
import history from '../../../history'
import UpdateCompany from './adminCompanies/updateCompany/UpdateCompany' 
import  {Form } from 'react-bootstrap'
import AuthenticationService from '../../../../servicies/authenticationService/AuthenticationService'
import {GrClose} from 'react-icons/gr'


Modal.setAppElement('#root')
export default function AdminAction(props) {

const [modalIsOpen,setModalIsOpen] =useState(false)
const [values,setValues]=useState([])
const [curretnsUser,setCurrentsUser]=useState(false);
const companyRef=useRef([]);
const [showSelectedUser,setShowSelectedUser]=useState(false)
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

const fetchRef=()=>{
    companyRef.current=props.tableValues
}

useEffect(() => {
    setModalIsOpen(props.toOpen)
    setValues(props.tableValues)
    fetchRef();
    
}, [companyRef])

const closeModal=()=>{

    setModalIsOpen(false)
    history.goBack();
}

const fetchCompnayInfo=(email)=>{
    if(email==='0'){
       setCurrentsUser(false)
    }else{
        console.log(email)
        let response=AdminService.getCompanyInfo(email).then(
            (res)=>{
                setCurrentsUser(res.data);
                console.log(res.data)
            }
        )
    }
    
    console.log(curretnsUser)
        
}
const fetchCustomerInfo=(email)=>{

    if (email==='0'){
        setCurrentsUser(false)
    }else{
        let response=AdminService.getCustomerInfo(email).then(
            (res)=>{
                setCurrentsUser(res.data);
                console.log(res.data)
            }
        )

    }

}

const showSelectedUserinfo=()=>{
   if( history.location.pathname.includes('/admin/company/actions')){
    return(  
         <UpdateCompany  company={curretnsUser} showUpdate={setShowSelectedUser} /> 
    ) }  
    else if(history.location.pathname.includes('/admin/customer/actions')){
        return(
          <h1>s</h1>
        )
    }
} 


const handleDelete=(currentId)=>{
    if(history.location.pathname.includes('/admin/company/actions')){
        deleteCompany(currentId)
    }
    if(history.location.pathname.includes('/admin/customer/actions')){
        deleteCustomer(currentId)
    }
    else{
        AuthenticationService.logOut()
        history.push('/wellcom')
    }

}

const deleteCompany=(comapnyId)=>{

    console.log(comapnyId)

    if(comapnyId!=0){
        AdminService.deleteCompany(comapnyId).then(
            response=>{
                alert("company was deleted ")
            },
            error =>{
                try{
                    if(error.response.data.string){
                        console.log(error.response.data.string)
                        return;
                    }
                    if(error.response){
                        console.log(error.response)
                      
                    }
                }catch{
                    alert("Servers are down, please try again later.");
                    history.push('/wellcom')
                }
            }
        )

    }
  


}
const deleteCustomer=(customerId)=>{



    if(customerId!=0){
        AdminService.deleteCustomer(customerId).then(
            response=>{
                alert("custoemr was deleted ")
            },
            error =>{
                try{
                    if(error.response.data.string){
                        console.log(error.response.data.string)
                        return;
                    }
                    if(error.response){
                        console.log(error.response)
                        AuthenticationService.logOut();
                        history.push('/wellcom')
                    }
                }catch{
                    alert("Servers are down, please try again later.");
                    history.push('/wellcom')
                }
            }
        )

    }
  


}
const showSelectedEmails=()=>{

    if(history.location.pathname.includes('/admin/company/actions')){
        
        return(
              
        <div>                   
        <Form.Select size="sm" as="select" onChange={(e)=>fetchCompnayInfo(e.target.value)} >
        <option key='00' value='0'> Select company</option>
        {
            props.tableValues.map(
                (email,index)=>{
                    return(
                        <option  key={index} value={email}>{email}</option>
                    )
                }
            )}                                                 
    </Form.Select>        
        </div>
        )
    }
    else if (history.location.pathname.includes('/admin/customer/actions')) {
       return (
        <div>                   
        <Form.Select size="sm" as="select" onChange={(e)=>fetchCustomerInfo(e.target.value)} >
        <option key='00' value='0'> Select Customer</option>
        {
            props.tableValues.map(
                (email,index)=>{
                    return(
                        <option  key={index} value={email}>{email}</option>
                    )
                }
            )}                                                 
            </Form.Select>        
        </div>
       ) 
    } 

    
}

    return (
        <div>
            <Modal style={modalStyle} isOpen={modalIsOpen} shouldCloseOnEsc={false} shouldCloseOnOverlayClick={false} onRequestClose={()=>setModalIsOpen(false)}>
                <div  className="navBar-actions">
                <button className="btn btn-danger my-1" onClick={closeModal}  ><GrClose/></button> { ' '}
                <button className="btn btn-primary my-1" onClick={()=>setShowSelected(true)}>Show Selected Users</button>{ ' '}
                <button onClick={()=>console.log(curretnsUser)}> Log</button>
                
                {
                    curretnsUser?<div> <button className="btn btn-primary my-1" onClick={()=>handleDelete(curretnsUser.id)}> Delete selected User </button> {' '}
                    <button className="btn btn-primary my-1" onClick={()=>setShowSelectedUser(true)}>Update Selected User</button> </div>:null
                    
                }
                
                {
                    showSelected? showSelectedEmails():null
                }
                {
                    showSelectedUser? showSelectedUserinfo():null
                }
                </div>
               
                

            </Modal>
        </div>
        
    )
}
