import classes from '../../header/MainHeader.module.css'


import React from 'react'
import { NavLink } from 'react-router-dom'
import AuthenticationService from '../../../servicies/authenticationService/AuthenticationService';

export default function CompanyHeader() {

  

    const handleLogput=()=>{
        AuthenticationService.logOut();
    }
    return (
        
            <header className={classes.header}>
           
           <nav>
               <ul>
                   <li>
                       <NavLink activeClassName={classes.active} to ="/company/home"> Store </NavLink>
                   </li>
                   <li>
                       <NavLink activeClassName={classes.active} to ="/company/coupons">My Coupons </NavLink>
                   </li>
                   <li>
                       <NavLink activeClassName={classes.active} to ="/company/profile"> Profile </NavLink>
                   </li>
                   <li>
                       <NavLink activeClassName={classes.active} to ="/wellcom/store" onClick={()=>handleLogput()}> Logout  </NavLink>
                   </li>
               </ul>
           </nav>
       </header>
        
    )
}
