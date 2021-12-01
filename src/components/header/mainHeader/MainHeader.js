import classes from '../MainHeader.module.css'
import {NavLink} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {CgLogIn} from 'react-icons/cg'
import {FaUserPlus} from 'react-icons/fa'


export default function MainHeader(props){



    return(
        
        <header className={classes.header}>
           
            <nav>
                <ul>
                    <li>
                        <NavLink activeClassName={classes.active} to ="/wellcom/store"><AiFillHome /> Store </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={classes.active} to ="/wellcom/login"><CgLogIn/> Login </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={classes.active} to ="/wellcom/signup/customer"><FaUserPlus/> Signup </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={classes.active} to ="/wellcom/signup/company"><FaUserPlus/> Join as Company  </NavLink>
                    </li>
                </ul>
            </nav>
        </header>

    )


}