import React, { useLayoutEffect, useState } from 'react'
import { Field, Formik, Form } from 'formik'
import AdminService from '../../../../../../servicies/adminService/AdminService'
import AuthenticationService from '../../../../../../servicies/authenticationService/AuthenticationService'

export default function UpdateCustomer(props) {
   

    const [currentCustomer,setCurrentCustomer]=useState({})


    const back = () => {
        if (window.confirm("Cancel update?")) {
            
            props.showUpdate(false)
        }
    }
    useLayoutEffect(()=>{

      setCurrentCustomer(props.customer)
        
    },[currentCustomer])

const handleSubmit=(values)=>{
    let customerToUpdate={
        id:currentCustomer.id,
        firstName:values.firstName,
        lastName:values.lastName,
        email:currentCustomer.email,
        password:currentCustomer.password
    }
    console.log(customerToUpdate)

    AdminService.updateCustomer(customerToUpdate).then(
        response=>{
            
               alert('Customer was updated!' );
               props.showUpdate(false)
            
        },
            error =>{
                try{
                    if(error.response.data.string){
                        console.log(error.response.data.string)
                        return;
                    }
                    if(error.response){
                        AuthenticationService.logOut();
                    }
                }catch{
                    alert("Servers are down, please try again later.");

                }
            }
        )

}

    return (
        <div className="container">
         
            <Formik 
                 initialValues={{ email: props.customer.email, password: "", firstName:props.customer.firstName,lastName:props.customer.lastName }}
                 onSubmit={(values, { setFieldValue }) => handleSubmit(values, { setFieldValue })}
            >
                  

            {({ values,dirty }) => (
                    <div className="updateCustomer-form">
                        <h2 className="UpdateCustomer-title">Update Company</h2><br />
                        <Form >
                       
                            <div className="form-group">
                            
                        
                                <label> First Name</label>
                                <Field className="col-sm-6" id="UpdateCustomer-filed"
                                    type="firstName"
                                    name="firstName"
                                    placeholder={currentCustomer.firstName}
                                    required={true}
                                
                                />


                            </div>
                            <div className="form-group">
                            
                        
                            <label> Last Name</label>
                            <Field className="col-sm-6" id="UpdateCustomer-filed"
                                type="lastName"
                                name="lastName"
                                placeholder={currentCustomer.lastName}
                                required={true}
                            
                            />


                        </div>

                            <div className="form-group">

                                <label id="UpdateCustomer-label">Email</label>
                                <Field className="col-sm-2" id="UpdateCustomer-filed"
                                    type="email"
                                    name="email"
                                    placeholder={currentCustomer.email}
                                    
                                    required={true}
                                    
                                />

                            </div>
                            <div className="form-group">
                                
                                 <div className="UpdateCompany-seperator"></div>
                                   <button type="submit" className="btn btn-primary my-1" title="Update" disabled={!dirty}>
                                        Update
                                  </button>

                            </div>
                           
                            <button type="submit" className="btn btn-primary my-1" title="Return" id="UpdateCompany-return" onClick={back}>
                                            ←
                                      </button>

                            

                            <div className="UpdateCompany-seperator"></div>
                        </Form>
                    </div>
               
            )}
            </Formik>
        </div>
     
    )
}
