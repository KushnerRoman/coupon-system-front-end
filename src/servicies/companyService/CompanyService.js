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
   async updateCoupon(coupon){
       return await axios.post('http://localhost:8080/apis/companycontroller/updateCoupon',
        coupon,{headers:{'Content-Type':'application/json'}}
       )
   }
   async deleteCoupon(couponId){
       return await axios.delete("http://localhost:8080/apis/companycontroller/deleteCoupon",
       {params:{couponId}}
       )
   }
   async addCoupon(coupon){
       return await axios.put("http://localhost:8080/apis/companycontroller/addCoupon",
       coupon,{headers:{'Content-Type':'application/json'}}
       )
   }async getCompanyInfo(email){
    return await axios.get("http://localhost:8080/apis/companycontroller/getCompanyInfo",
    {params:{email}}
    )
}


    
}export default new CompanyService();
