import React, { useState,useEffect,useLayoutEffect } from 'react'
import { Field, Formik, Form } from 'formik'
import CompanyService from '../../../../../servicies/companyService/CompanyService';
import AuthenticationService from '../../../../../servicies/authenticationService/AuthenticationService';

export default function UpdateCoupon(props) {
    const [couponToUpdate,setCouponToUpdate]=useState();
    const initialValues={
       
        price:props.coupon[0].price,
        image:props.coupon[0].image,
        endDate:props.coupon[0].endDate,
        amount:props.coupon[0].amount

    }

    useLayoutEffect(() => {
       props.inUpdate(true) 
     setCouponToUpdate(props.coupon[0])
  },[props.coupon[0],couponToUpdate])


const handleSubmit=(values)=>{
      let coupon={
          id:couponToUpdate.id,
          title:values.title,
          description:couponToUpdate.description,
          amount:values.amount,
          endDate:values.endDate,
          startDate:couponToUpdate.startDate,
          price:values.price,
          image:values.image,
          companyId:couponToUpdate.companyId,
          company:couponToUpdate.company,
          category:couponToUpdate.category
    }

    CompanyService.updateCoupon(coupon).then(
        response=>{
            alert('company was updated!' );
             
             props.refresh();
        },error=>{
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
    console.log(coupon)
}

    return (
        <div>    <button className="btn btn-secondary my-1" onClick={()=>props.inUpdate(false)}>
        Change Coupon
    </button>
            <Formik
        initialValues={{endDate:Date.now,price:Number,amount:Number,image:null}}
        onSubmit={(values) => handleSubmit(values)}
            >
             
                {
                    ({values,dirty})=>(
                        <div className="container">
                            <div className="">
                                <Form >
                               
                                    <div className="fomr-group">
                                        <label>End Date</label>
                                        <Field className="col-sm-6"  id="UpdateCompany-filed"
                                            type="date"
                                            name="endDate"
                                            min={new Date().toISOString().split('T')[0]}
                                            required={true}
                                            placeholder={props.coupon[0].endDate}
                                            

                                        />
                                    </div>
                                    <div className="fomr-group">
                                        <label>Price</label>
                                        <Field className="col-sm-6"  id="UpdateCompany-filed"
                                            type="number"
                                            name="price"
                                            required={true}
                                            placeholder={props.coupon[0].price}
                                            
                                            

                                        />
                                    </div>
                                    <div className="fomr-group">
                                        <label>Image</label>
                                        <Field className="col-sm-6"  id="UpdateCompany-filed"
                                            type="url"
                                            name="image"
                                            placeholder={props.coupon[0].image}
                                            required={true}
                                            


                                        />
                                    </div>
                                    <div className="fomr-group">
                                        <label>Amount</label>
                                        <Field className="col-sm-6"  id="UpdateCompany-filed"
                                            type="number"
                                            name="amount"
                                            placeholder={props.coupon[0].amount}
                                            required={true}

                                        />
                                    </div>
                                    <button className="btn btn-secondary my-1" type="submit" disabled={!dirty}>update</button>
                                </Form>
                            </div>
                            
                        </div>
                    )
                    
                }
                
        </Formik>
       
        </div>
        
    )
}
