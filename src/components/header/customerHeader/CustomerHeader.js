import React,{useContext} from 'react'
import { NavLink,Route } from 'react-router-dom';
import AuthContext from '../../../context/auth-context';
import AuthenticationService from '../../../servicies/authenticationService/AuthenticationService';
import classes from '../../header/MainHeader.module.css'
import Customer from '../../pages/customer/Customer';

export default function CustomerHeader() {
   
    const loggedUser = useContext(AuthContext)
    const handleLogput=()=>{
        loggedUser.onLogout();
        AuthenticationService.logOut();
    }
    return (
        
            <header className={classes.header}>
           
           <nav>
               <ul>
                   <li>
                       <NavLink activeClassName={classes.active} to ="/customer/store"> Store </NavLink>
                   </li>
                   <li>
                       <NavLink activeClassName={classes.active} to ="/customer/coupons">Coupons</NavLink>
                    
                   </li>
                   <li>
                       <NavLink activeClassName={classes.active} to ="/customer/profile"> Profile </NavLink>
                   </li>
                   <li>
                       <NavLink activeClassName={classes.active} to ="/wellcom/store" onClick={()=>handleLogput()}> Logout  </NavLink>
                   </li>
               </ul>
           </nav>
       </header>
        
    )
}
