import classes from '../MainHeader.module.css'
import {NavLink,Switch,Route,useHistory} from 'react-router-dom'
import AuthenticationService from '../../../servicies/authenticationService/AuthenticationService'
import { Navbar, NavbarBrand, Nav } from "react-bootstrap";


export default function AdminHeader(props){
    

const handleLogput=()=>{
    AuthenticationService.logOut();
}
    return(
       
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                <NavbarBrand href="/admin/wellcom/store">Coupon Store</NavbarBrand>
                    </li>
                    <li >
                        <NavLink activeClassName={classes.active} to ='/admin/companies'>Companies</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={classes.active} to ="/admin/customers"> Customers </NavLink>
                    </li>
                     <li> 
                        <NavLink activeClassName={classes.active} to ="/wellcom/store" onClick={handleLogput}> Logout </NavLink>
                     </li>
             </ul>
            </nav>
        </header>

    )


}