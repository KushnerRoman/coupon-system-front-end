import React, { useState,useEffect,useRef } from 'react'
import Modal from 'react-modal'
import  './AdminActions.css'
import AdminService from '../../../../servicies/adminService/AdminService'
import history from '../../../history'
import UpdateCompany from './updateCompany/UpdateCompany'
import  {Form } from 'react-bootstrap'
import AuthenticationService from '../../../../servicies/authenticationService/AuthenticationService'


Modal.setAppElement('#root')
export default function AdminAction(props) {

const [modalIsOpen,setModalIsOpen] =useState(false)
const [values,setValues]=useState([])
const [currentCompany,setCurrentCompany]=useState(false);
const companyRef=useRef([]);
const [showCompany,setShowCompany]=useState(false)
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
       setCurrentCompany(false)
    }else{
        console.log(email)
        let response=AdminService.getCompanyInfo(email).then(
            (res)=>{
                setCurrentCompany(res.data);
                console.log(res.data)
            }
        )
    }
    
    console.log(currentCompany)
        
}
const updateFatching=()=>{
    props.updateFatching()
}
const showCompanyInfo=()=>{
    return(
        <div>
            <UpdateCompany company={currentCompany} showUpdate={setShowCompany} />
        </div>
     
    )  
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
                        AuthenticationService.logOut();
                    }
                }catch{
                    alert("Servers are down, please try again later.");
    
                }
            }
        )

    }
  


}
const showSelectedEmails=()=>{

    return(
        <div>
            <Form.Select as="select" onChange={(e)=>fetchCompnayInfo(e.target.value)} >
                <option key='00' value='0'> Select company</option>
                {
                    props.tableValues.map(
                        (email,index)=>{
                            return(
                                <option key={index} value={email}>{email}</option>
                            )
                        }
                    )
                }
                
               
            </Form.Select>
        </div>
    )
}

    return (
        <div>
            <Modal style={modalStyle} isOpen={modalIsOpen} shouldCloseOnEsc={false} shouldCloseOnOverlayClick={false} onRequestClose={()=>setModalIsOpen(false)}>
                <div  className="navBar-actions">
                <button className="btn btn-danger my-1" onClick={closeModal}  >Close Modal</button> { ' '}
                <button className="btn btn-primary my-1" onClick={()=>setShowSelected(true)}>show Selected companies</button>{ ' '}
                <button onClick={()=>console.log(currentCompany)}> Log</button>
                
                {
                    currentCompany?<div> <button className="btn btn-primary my-1" onClick={()=>deleteCompany(currentCompany.id)}> Delete Company hiden</button> <button className="btn btn-primary my-1" onClick={()=>setShowCompany(true)}>Update Company</button> </div>:null
                    
                }
                
                {
                    showSelected? showSelectedEmails():null
                }
                {
                    showCompany? showCompanyInfo():null
                }
                </div>
               
                

            </Modal>
        </div>
        
    )
}
