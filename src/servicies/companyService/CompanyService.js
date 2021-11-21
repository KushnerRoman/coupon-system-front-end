import axios from 'axios'


axios.interceptors.request.use( config => {
  const user = JSON.parse(localStorage.getItem('user'));

  if(user && user.accessToken){
    const token = 'Bearer ' + user.accessToken;
    config.headers.Authorization =  token;
  }

  return config;
});



 class CompanyService{
   
    async getCompanyCoupons(email){
        return await axios.get('http://localhost:8080/apis/companycontroller/getAllCouponsofCompany',{params:{email}})
    }


    
}export default new CompanyService();
