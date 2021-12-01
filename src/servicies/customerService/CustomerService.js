import axios from 'axios'


axios.interceptors.request.use( config => {
  const user = JSON.parse(localStorage.getItem('user'));

  if(user && user.accessToken){
    const token = 'Bearer ' + user.accessToken;
    config.headers.Authorization =  token;
  }

  return config;
});

class CustomerService{

    async getCustoemrInfo(email){
      return await axios.get("http://localhost:8080/apis/customercontroller/getcustomerinfo",
      {params:{email}})
    }

    async getCustomerCoupons(email){
      return await axios.get("http://localhost:8080/apis/customercontroller/getcustomercoupons",
      {params:{email}}
      )
    }

    async buyCoupon(coupon){

        return await axios.put("http://localhost:8080/apis/customercontroller/purchaseCoupon",
        coupon,{headers:{'Content-Type':'application/json'}}
        );
    }

   

}export default new CustomerService()