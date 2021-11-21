import React,{useState} from 'react'
import Card from '../UI/card/Card'
import classes from './Login.module.css'
import { Form } from 'react-bootstrap';
import {  FormGroup, Input, Label, Button } from 'reactstrap';
import history from '../history';
import AuthenticationService from '../../servicies/authenticationService/AuthenticationService';
import { Alert } from 'react-bootstrap';

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState('');
    const [role,setRole]=useState('')
    const [error, setError] = useState('');
    const [showError,setShowError]=useState(false)

    const doLogin = async (event) => {
        event.preventDefault();
        console.log(role)

       
            AuthenticationService.login(
                userName, password,role
            ).then(
                () => {
                    switch (role){
                        case 'ROLE_Administrator':
                            
                            history.push('/admin')
                            break;
                        case 'ROLE_Customer':
                          
                            history.push('/customer')
                            break;
                        case 'ROLE_Company':
                           
                            history.push('/company')
                            break;
                        case '0':
                            alert('Please choose type of login user ')   
                            break;
                        default:
                            break;                                    
                    }
                }, err => {
                    setShowError(true)
                    setError("Error ! WRONG email or password")

                })
       

    }



    return(
        <div>
              {
                showError?<Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                <Alert.Heading>{error}</Alert.Heading>
              </Alert>:null
            }
             <Card className={classes.login}>
                <Form onSubmit={doLogin}>
                    

                    <div >
                        <FormGroup className={classes.control}>
                            <Label>Email </Label>
                            <Input type="email" placeholder="Email"
                                name="username" id="username"
                                value={userName} onChange={
                                    e => setUserName(e.target.value)
                                }
                                autoComplete="email"
                            />
                        </FormGroup>

                        <FormGroup className={classes.control}>
                            <Label>Password </Label>
                            <Input type="password" placeholder="Password"
                                name="password" id="password"
                                value={password} onChange={
                                    e => setPassword(e.target.value)
                                } />
                        </FormGroup>
                    </div>
                    <div className={classes.actions}>
                        <Button type="submit" className={classes.btn} >Login</Button>
                    </div>
                </Form>
                
                
                        <Form.Control size="sm" as="select" className={classes.roleSelect} onChange={e=>setRole(e.target.value)}>
                            <option  value='0'>Select User Type</option>
                            <option value='ROLE_Customer'>Customer</option>
                            <option value='ROLE_Company'>Company</option>
                            <option value='ROLE_Administrator'>Admin</option> 

                        </Form.Control>
                 
                
            </Card>
        </div>
    )
}
