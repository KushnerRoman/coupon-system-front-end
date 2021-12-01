import React,{ useContext, Suspense } from 'react';
import { Router,Switch,Route } from 'react-router-dom';
import MainHeader from './components/header/mainHeader/MainHeader'
import history from './components/history'
import './App.css';
import AuthenticationService from './servicies/authenticationService/AuthenticationService';
import Login from './components/login/Login';
import Admin from './components/pages/admin/Admin';
import AdminHeader from './components/header/adminHeader/AdminHeader';
import CompanyHeader from './components/header/companyHeader/CompanyHeader';
import CompanySignup from './components/registration/CompanySignup';
//import Company from './components/pages/company/Company';
//import Customer from './components/pages/customer/Customer';
import CustomerSignup from './components/registration/CustomerSignup';
import CustomerHeader from './components/header/customerHeader/CustomerHeader';
import Categories from './components/pages/store/categories/Categories';
import Home from './components/pages/store/Home';
import AuthContext from './context/auth-context';

const Customer= React.lazy(()=>import('./components/pages/customer/Customer'));
const Company =React.lazy(()=>import('./components/pages/company/Company'))


function App() {

  const loggedUser=useContext(AuthContext)


  if(!AuthenticationService.getCurrentUser() ){
  
    history.push('/wellcom/store')
    AuthenticationService.logOut();
  }else{
    switch(AuthenticationService.getCurrentUser().authorities[0].authority){
        case 'ROLE_Administrator':
          if(!history.location.pathname.includes('/admin')){
             history.push('/admin');
          }
          break;
        case 'ROLE_Company':
          if(!history.location.pathname.includes('/company')){
            history.push('/company/coupons');
          }
          break;
        case 'ROLE_Customer':
          if(!history.location.pathname.includes('/customer')){
             history.push('/wellcom/store');
          }
          break;
          default:
            AuthenticationService.logOut();
            history.push('/wellcom/store')
    }
  }



const getHeader=()=>{
  return( 
    <Suspense  fallback={<p>Loading...</p>}>
       <Switch>
    <Route path='/wellcom'   >
      <MainHeader />
    </Route>
    <Route path='/admin'>
      <AdminHeader/>
    </Route>
    <Route path='/customer'>
      <CustomerHeader/>
    </Route>
    <Route path='/company'>
      <CompanyHeader/>
    </Route>
  </Switch>
    </Suspense>
 )
 
}
const displayPage=()=>{
  return(
    <Suspense fallback={<p>Loading...</p>}>
       <Switch>
      <Route path='/wellcom/login'>
        <Login />
      </Route>
      <Route path='/admin'>
        <Admin />
      </Route>
      <Route path='/customer' >
        <Customer />
      </Route>
      <Route path='/company'>
        <Company />
      
      </Route>
      <Route path='/wellcom/signup/company' >
        <CompanySignup/>
      </Route>
      <Route path='/wellcom/signup/customer' >
        <CustomerSignup/>
      </Route>
      <Route path={['/wellcom/store','/customer/store','/compnay/home']} >
        <Home/>
      </Route>
     
    </Switch>
    </Suspense>
   
    
  )
}



  return (
    <Router history={history}>
    <div className="App">
    
      {getHeader()}
      {displayPage()}
    
      
      
     
    </div>

    </Router>
  );
}

export default App;
