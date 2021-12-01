import { Field, Formik,Form } from 'formik'
import React,{useRef,useState} from 'react'
import AuthenticationService from '../../../../../servicies/authenticationService/AuthenticationService'
import CompanyService from '../../../../../servicies/companyService/CompanyService'
import { getDate } from '../../../../Utils/datesUtil/getDate'

import './CreateCoupon.css'

export default function CreateCoupon(props) {


    const handleSubmit=(values)=>{
        let coupon={
            title:values.title,
            description:values.description,
            amount:values.amount,
            endDate:values.endDate,
            startDate:values.startDate,
            price:values.price,
            image:values.image,
            companyId:props.companyId.id,
            company:values.company,
            category:values.category
      }
        CompanyService.addCoupon(coupon).then(
            response=>{
                alert('Coupn was Created!' );

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
    })}

    return (
        <>
            <Formik initialValues={{
                title:'',
                amount:'',
                description:'',
                image:'',
                price:'',
                endDate:'',
                startDate:'',
                category:'',

            }}
            onSubmit={handleSubmit}
            >
                {({values})=>(
                    <Form>
                    <div className="CompanyAddCoupon-div-seperator"></div>
                    <div className="input-group">
                        <div className="input-group-text" id='CompanyAddCoupon-title-div' title='Title'>Title</div>
                        <Field
                            title={values.title}
                            name='title'
                            className='form-control'
                            placeholder='Title'
                            required={true}
                            id='CompanyAddCoupon-input'
                        />
                    </div>
                    <div className="CompanyAddCoupon-div-seperator"></div>
                    <div className="input-group">
                        <div className="input-group-text" id='CompanyAddCoupon-description-div' title='Description'>Description</div>
                        <Field
                            title={values.description}
                            name='description'
                            className='form-control'
                            placeholder='Description'
                            required={true}
                            id='CompanyAddCoupon-input'
                        />
                    </div>
                    <div className="CompanyAddCoupon-div-seperator"></div>
                    <div className="input-group">
                        <div className="input-group-text" id='CompanyAddCoupon-category-div' title='Category'>Category</div>
                        <Field
                            className='form-select'
                            component="select"
                            name="category"
                            required={true}
                            id='CompanyAddCoupon-input'
                            title={values.category}
                        >
                            <option value="">-</option>
                            <option value="FOOD">FOOD</option>
                            <option value="ELECTRICITY">ELECTRICITY</option>
                            <option value="FESTIVALS">FESTIVALS</option>
                            <option value="EVENTS">EVENTS</option>
                            <option value="MOBILE">MOBILE</option>
                            <option value="CLOTHES">CLOTHES</option>
                            <option value="CARS">CARS</option>
                            <option value="OUTDOOR">OUTDOOR</option>
                            <option value="HATS">HATS</option>
                        </Field>
                    </div>
                    <div className="CompanyAddCoupon-div-seperator"></div>
                    <div className="input-group">
                        <div className="input-group-text" id='CompanyAddCoupon-image-div' title='Image URL'>Image URL</div>
                        <Field
                            type='url'
                            name='image'
                            className='form-control'
                            placeholder='http://www.example.com/image.png'
                            required={true}
                            id='CompanyAddCoupon-input'
                            title={values.image}
                        />
                    </div>
                    <div className="CompanyAddCoupon-div-seperator"></div>
                    <div className="input-group">
                        <div className="input-group-text" id='CompanyAddCoupon-price-div' title='Price'>Price</div>
                        <div className="input-group-text" title='$'>$</div>
                        <Field
                            step='.01'
                            type='number'
                            min='0'
                            name='price'
                            className='form-control'
                            placeholder='0.00'
                            required={true}
                            title={values.price}
                        />
                        <div className="CompanyAddCoupon-div-seperator"></div>
                        <div className="input-group-text" title='Amount'>Amount</div>
                        <Field
                            type='number'
                            min='0'
                            name='amount'
                            className='form-control'
                            placeholder='0'
                            required={true}
                            id='CompanyAddCoupon-input'
                            title={values.amount}
                        />
                    </div>
                    <div className="CompanyAddCoupon-div-seperator"></div>
                    <div className="input-group">
                        <div className="input-group-text" id='CompanyAddCoupon-start_date-div' title='Date'>Date</div>
                        <div className="input-group-text" title='From:'>From:</div>
                        <Field
                            min={getDate()}
                            type='date'
                            name='startDate'
                            className='form-control'
                            required={true}
                            id='CompanyAddCoupon-input'
                            title={values.startDate}
                        />
                        <div className="input-group-text" id='CompanyAddCoupon-end_date-div' title='To:'>To:</div>
                        <Field
                            min={values.startDate}
                            type='date'
                            name='endDate'
                            className='form-control'
                            required={true}
                            id='CompanyAddCoupon-input'
                            title={values.endDate}
                        />
                    </div>
                    <div className="CompanyAddCoupon-div-seperator"></div>
                    <div className="CompanyAddCoupon-div-seperator"></div>
                    <div className='CompanyAddCoupon-submit'>
                        <button type='submit' className='btn btn-primary' title='Add Coupon'>
                            Add Coupon
                        </button>
                    </div>
                    <div className="CompanyAddCoupon-div-seperator"></div>
                    <div className="CompanyAddCoupon-div-seperator"></div>
                </Form>
                )}
               
            </Formik>
            
        </>
    )
}

