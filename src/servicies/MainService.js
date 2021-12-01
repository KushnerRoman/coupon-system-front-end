import axios from 'axios'


class MainService{


    async getAllCoupons(){
        return await axios.get('http://localhost:8080/apis/companycontroller/getallcoupons')
    }
    async getAllCompanies(){
        return await axios.get('http://localhost:8080/apis/companycontroller/getAll')
    }
    async getAllCategories(){
        return await axios.get('http://localhost:8080/apis/companycontroller/allCategories')
    }
    async getCompanyInfo(email){
        return await axios.get("http://localhost:8080/apis/companycontroller/getCompanyInfo",
        {params:{email}}
      )
    }

}export default new MainService();

