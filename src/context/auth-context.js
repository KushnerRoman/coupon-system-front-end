import CustomerService from "../servicies/customerService/CustomerService";
import React,{useState,useEffect} from "react";
import AuthenticationService from "../servicies/authenticationService/AuthenticationService";

const AuthContext =React.createContext(
    {
        isUserLoggedIn:false,
        isCompanyLoggedIn:false,
        isAdminLoggedIn:false,
        userContext:'',
        username:'',

        checkLoggedId:()=>{},
        onLogout:()=>{},
        onCustomerLogin:()=>{},
        onCompanyLogin:()=>{},
        onAdminLogin:()=>{}
      
    }
);


export const AuthContextProvider = (props)=>{
    const [isUserLoggedIn,setIsUserLoggedIn]= useState(false);
    const [isCompanyLoggedIn,setIsCompanyLoggedIn]=useState(false);
    const [isAdminLoggedIn,setIsAdminLoggedIn]=useState(false);
    const [userContext,setUserContext]=useState(JSON.parse(localStorage.getItem('user')));
    const [username,setUsername]=useState('');


    const logoutHandler =()=>{
        setIsUserLoggedIn(false)
        setIsCompanyLoggedIn(false)
        setIsAdminLoggedIn(false)
        localStorage.removeItem('customer-id')
        localStorage.removeItem('user')
        localStorage.removeItem('Role')
      }

     const getLocalUser=()=>{
         console.log('hello')
        setIsUserLoggedIn(true); 
        setUsername(userContext.username)
        console.log(userContext.username) 
     } 
     const loginCompanyHandler=()=>{
        setIsCompanyLoggedIn(true)
     }
     const loginAdminHadnler=()=>{
         setIsAdminLoggedIn(true)
     }
     const getUserName=()=>{
         return userContext.username
     }


     useEffect(()=>{

       

        async function localUserLoginCheck(){

            if(AuthenticationService.getCurrentUser()){
                let user = await AuthenticationService.getCurrentUser().username;
                
                    let role= await AuthenticationService.getCurrentUser().authorities[0].authority
                setUsername(user)
            switch (role){
                case 'ROLE_Administrator':
                    setIsAdminLoggedIn(true);
                    
                    break;
                case 'ROLE_Customer':
                    setIsUserLoggedIn(true)
                   getLocalUser();
                    break;
                case 'ROLE_Company':
                    setIsCompanyLoggedIn(true);
                    break;
                default:
                    break;            
             }
                
            
            }

        }
        
        localUserLoginCheck();
        

         
     },[]) 


    return <AuthContext.Provider value={{
             isUserLoggedIn:isUserLoggedIn,
             isCompanyLoggedIn:isCompanyLoggedIn,
             isAdminLoggedIn:isAdminLoggedIn,
             userContext:userContext,
             username:username,
             getUserName:getUserName,
             onLogout:logoutHandler,
             onCustomerLogin:getLocalUser,
             onCompanyLogin:loginCompanyHandler,
             onAdminLogin:loginAdminHadnler
    }}>
                {props.children}
          </AuthContext.Provider>
}


export  default AuthContext;