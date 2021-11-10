import classes from '../MainHeader.module.css'
import {NavLink} from 'react-router-dom'


export default function MainHeader(props){


    return(
        
        <header className={classes.header}>
           
            <nav>
                <ul>
                    <li>
                        <NavLink activeClassName={classes.active} to ="/wellcom/home"> Store </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={classes.active} to ="/wellcom/login"> Login </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={classes.active} to ="/wellcom/signup/customer"> Signup </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={classes.active} to ="/wellcon/signup/company"> Join as Company  </NavLink>
                    </li>
                </ul>
            </nav>
        </header>

    )


}