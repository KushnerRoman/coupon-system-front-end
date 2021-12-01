import React from 'react'
import { Card } from 'react-bootstrap'
import history from '../../../../history'

export default function CompanyProfile(props) {
    return (
        <div className="companyProfile-div">
                <Card>
                    <h1>ID :{props.companyId.id}</h1>
                    <h1>Email :{props.companyId.email}</h1>
                    <h1>Name :{props.companyId.name}</h1>
                    <button className="btn btn-secondary my-1" type="submit"onClick={()=>history.push('/company/coupons')} >See Coupons</button>
                </Card>
        </div>
    )
}
