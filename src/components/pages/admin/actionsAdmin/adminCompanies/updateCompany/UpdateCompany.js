import './update-company.css'

import history from '../../../../../history'; 
import AdminService from '../../../../../../servicies/adminService/AdminService'; 
import AuthenticationService from '../../../../../../servicies/authenticationService/AuthenticationService'; 
import { useEffect, useState,useLayoutEffect } from 'react';
import { Field, Formik, Form } from 'formik'



export default function UpdateCompany(props) {

    const [currentCompany,setCurrentCompany]=useState({})


    const back = () => {
        if (window.confirm("Cancel update?")) {
            
            props.showUpdate(false)
        }
    }
    useLayoutEffect(()=>{

      setCurrentCompany(props.company)
        
    },[currentCompany])

const handleSubmit=(values)=>{
    let companyToUpdate={
        id:currentCompany.id,
        name:values.name,
        email:values.email,
        password:values.password
    }
    console.log(companyToUpdate)

    AdminService.updateCompany(companyToUpdate).then(
        response=>{
            
               alert('company was updated!' );
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
        <div className="UpdateCompany">
         
            <Formik 
                 initialValues={{ email: props.company.email, password: "", name:props.company.name }}
                 onSubmit={(values, { setFieldValue }) => handleSubmit(values, { setFieldValue })}
            >
                  

            {({ values,dirty }) => (
                    <div className="UpdateCompany-form">
                        <h2 className="UpdateCompany-title">Update Company</h2><br />
                        <Form >
                       
                            <div className="form-group">
                            
                        
                                <label>Name</label>
                                <Field className="col-sm-6" id="UpdateCompany-filed"
                                    type="name"
                                    name="name"
                                    placeholder={currentCompany.name}
                                    required={true}
                                
                                />


                            </div>

                            <div className="form-group">

                                <label id="UpdateCompany-label">Email</label>
                                <Field className="col-sm-2" id="UpdateCompany-filed"
                                    type="email"
                                    name="email"
                                    placeholder={currentCompany.email}
                                    
                                    required={true}
                                    
                                />

                            </div>
                            <div className="form-group">
                                <label  id="UpdateCompany-label"> Password </label>
                                <Field className="col-xl-2" id="UpdateCompany-filed"
                                    type="password"
                                    name="password"
                                    placeholder={currentCompany.password}
                                    required
                                   
                                />
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