import { useState } from 'react';
import { Router,Switch,Route } from 'react-router-dom';
import MainHeader from './components/header/mainHeader/MainHeader'
import history from './components/history'
import './App.css';
import AuthenticationService from './servicies/authenticationService/AuthenticationService';
import Login from './components/login/Login';
import Admin from './components/pages/admin/Admin';
import AdminHeader from './components/header/adminHeader/AdminHeader';


function App() {



  if(!AuthenticationService.getCurrentUser()){
    
    history.push('/wellcom')
  }else{
    switch(AuthenticationService.getCurrentUser().authorities[0].authority){
        case 'ROLE_Administrator':
          if(!history.location.pathname.includes('/admin')){
             history.push('/admin');
          }
          break;
        case 'ROLE_Company':
          if(!history.location.pathname.includes('/company')){
            history.push('/admin');
          }
          break;
        case 'ROLE_Customer':
          if(!history.location.pathname.includes('/customer')){
             history.push('/customer');
          }
          break;
          default:
            break;
    }
  }



const getHeader=()=>{
  return( 
  <Switch>
    <Route path='/wellcom'  >
      <MainHeader />
    </Route>
    <Route path='/admin'>
      <AdminHeader/>
    </Route>
  </Switch>)
 
}
const displayPage=()=>{
  return(
    <Switch>
      <Route path='/wellcom/login'>
        <Login />
      </Route>
      <Route path='/admin'>
        <Admin />
      </Route>
    </Switch>
    
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