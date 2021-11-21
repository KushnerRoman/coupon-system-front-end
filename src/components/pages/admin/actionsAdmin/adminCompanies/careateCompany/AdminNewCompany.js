import { Field, Formik,Form } from 'formik'
import React,{useState,useEffect} from 'react'


import AdminService from '../../../../../../servicies/adminService/AdminService'
import AuthenticationService from '../../../../../../servicies/authenticationService/AuthenticationService'
import history from '../../../../../history'
import './AdminNewCompany.css'




export default function AdminNewCompany(props) {


    const back = () => {
        history.goBack()
        
    }

const handleSubmit=(values)=>{
    let companyToCreate={
        name:values.name,
        email:values.email,
        password:values.password,
        userName:values.email,
    }
    
    console.log(companyToCreate)

    AuthenticationService.registerCompany(companyToCreate.name,companyToCreate.email,companyToCreate.password).then(
        response=>{
            if(AuthenticationService.getCurrentUser())
              {  if(AuthenticationService.getCurrentUser().authorities[0].authority==='ROLE_Administrator') {  
                    alert('company was Created!' );
                    history.push('/admin/companies');}
                }else{
                   AuthenticationService.login( companyToCreate.email, companyToCreate.password,'ROLE_Company').then(()=>
                    history.push('/company')
                   )
                }
             
            
        },
            error =>{
                try{
                    if(error.response.data.string){
                        console.log(error.response.data.string)
                        return;
                    }
                    if(error.response){
                        alert("Error Check sql requerments")
                    }
                }catch{
                    alert("Servers are down, please try again later.");

                }
            }
        )

}

    return (
        <div>
                 <Formik  initialValues={{
            name: '',
            email: '',
            password: '',
            user_name:'',
        }}
        onSubmit={handleSubmit}>
                       
            {({ values, handleChange }) => (
            <Form>
            <div className="container">
	
		<h3 className="my-4">Company Registration</h3>
		<hr className="my-3" />
		<div className="form-group mb-4 row">
            <label className="col-md-5 col-form-label">Comapny Name</label>
			<div className="col-md-7">
                <Field 
                type="text"
                 className="form-control form-control-lg"                
                name="name" 
                 required/>
                </div>
		</div>
		<div className="form-group mb-3 row">
            <label  className="col-md-5 col-form-label">Comapny Email</label>
			<div className="col-md-7">
                <Field 
                pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                type="email"
                 className="form-control form-control-lg"
                 
                   name="email" 
                   required/>
                   <small className="form-text text-muted"> Please enter a valid Email</small></div>
		</div>
		<div className="form-group mb-3 row">
            <label  className="col-md-5 col-form-label">Password</label>
			<div className="col-md-7">
                <Field type="password" 
                className="form-control form-control-lg"
                name="password"
                 required/>
                 <small className="form-text text-muted"> Please enter a valid Password from 8 char</small></div>
		</div>
		<hr className="bg-transparent border-0 py-1" />
		<hr className="my-4" />
		<div className="form-group mb-3 row">
            <label  className="col-md-5 col-form-label"></label>
			<div className="col-md-7">
                <button className="btn btn-primary btn-lg" type="submit">SUBMIT  </button>
                </div>
		</div>
	
</div>
        </Form>
            )}
          
        </Formik>
        <button type="submit" className="btn btn-primary my-1" title="Return" id="UpdateCompany-return" onClick={back}>
            ←</button>
        </div>
       
        
            
        
     


           

     
    )

}
