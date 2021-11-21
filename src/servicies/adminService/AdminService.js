import axios from 'axios'


axios.interceptors.request.use( config => {
  const user = JSON.parse(localStorage.getItem('user'));

  if(user && user.accessToken){
    const token = 'Bearer ' + user.accessToken;
    config.headers.Authorization =  token;
  }

  return config;
});

class AdminService{

    async getAllCompanies(){
        return await axios.get("http://localhost:8080/apis/adminController/getallcompanies")
    }

    async getAllCustomer(){
        return await axios.get("http://localhost:8080/apis/adminController/getallcustomers")
    }
    async getCompanyInfo(email){
       return await axios.get("http://localhost:8080/apis/adminController/getcompanybyid",
       {params:{email}})
    } 

    async updateCompany(company){
      return await axios.post("http://localhost:8080/apis/adminController/updateCompany",
      company,{headers:{'Content-Type':'application/json'}})
    }
    async deleteCompany(companyId){
      return await axios.delete("http://localhost:8080/apis/adminController/deletecompany",
      {params :{companyId}}
      )
    }

    async createCompany(newCompany){
      return await axios.put("http://localhost:8080/apis/adminController/addcompany",
      newCompany,{headers:{'Content-Type':'application/json'}}
      )
    }

    async getCustomerInfo(email){
      return await axios.get("http://localhost:8080/apis/adminController/getcustomerbyemail",
      {params:{email}})
    }
    async createCustomer(newCustomer){
      return await axios.put("http://localhost:8080/apis/adminController/addcustomer",
      newCustomer,{headers:{'Content-Type':'application/json'}})
    }
    async deleteCustomer(customerId){
      return await axios.delete("http://localhost:8080/apis/adminController/deletecustomer",
      {params :{customerId}}
      )
    }
    async getAllCoupons(){
      return await axios.get("http://localhost:8080/apis/adminController/getallCoupons")
    }

}
export default  new AdminService();