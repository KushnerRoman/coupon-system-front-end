import React,{ useContext, Suspense } from 'react';
import { Router,Switch,Route } from 'react-router-dom';
import history from './components/history'
import './App.css';
import AuthenticationService from './servicies/authenticationService/AuthenticationService';
import Categories from './components/pages/store/categories/Categories';
import AuthContext from './context/auth-context';


const Customer= React.lazy(()=>import('./components/pages/customer/Customer'));
const Company =React.lazy(()=>import('./components/pages/company/Company'))
const CustomerSignup =React.lazy(()=>import('./components/registration/CustomerSignup'));
const CustomerHeader=React.lazy(()=>import('./components/header/customerHeader/CustomerHeader'));
const Home=React.lazy(()=>import('./components/pages/store/Home'));
const PageNotFound=React.lazy(()=>import('./components/pages/notFound/PageNotFound'));
const MainHeader=React.lazy(()=>import('./components/header/mainHeader/MainHeader'));
const Login=React.lazy(()=>import('./components/login/Login'));
const Admin=React.lazy(()=>import('./components/pages/admin/Admin'));
const AdminHeader=React.lazy(()=>import('./components/header/adminHeader/AdminHeader'));
const CompanyHeader=React.lazy(()=>import('./components/header/companyHeader/CompanyHeader'));
const CompanySignup=React.lazy(()=>import('./components/registration/CompanySignup'));

function App() {

  const loggedUser=useContext(AuthContext)


  if(!AuthenticationService.getCurrentUser() ){
  
    history.push('/wellcom/store')
    AuthenticationService.logOut();
  }
   
  else{
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
      <Route path='*'>
        <PageNotFound/>
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
