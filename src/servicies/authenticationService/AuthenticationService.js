import axios from "axios"




class AuthenticationService{
    

    login = async (username,password,role) =>{
        try {
            const response = await axios.post("http://localhost:8080/apis/auth/login", { username, password ,role });
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            console.log(localStorage.getItem('user'));
            return response.data;
        } catch (err) { 
            console.log(err);
            throw err;
        }
        
    }
    logOut(){
        localStorage.removeItem('user')
        
    }

    registerCompany = async(companyName, email,password) =>{
        return axios.post("http://localhost:8080/apis/auth/registercompany",{
            companyName,
            email,
            password
        })
    }
    registerCustomer = async(firstname, lastname, email,password) =>{
        return axios.post("http://localhost:8080/apis/auth/registercustomer",{
            firstname,
            lastname,
            email,
            password
        })
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
      }
    
   
     
}

export default new AuthenticationService();