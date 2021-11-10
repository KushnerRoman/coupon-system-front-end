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

}
export default  new AdminService();