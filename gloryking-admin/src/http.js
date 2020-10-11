import axios from 'axios';
import Vue from 'vue'
const http = axios.create({
    //baseURL:'http://localhost:10086/api/admin'
    baseURL:process.env.VUE_APP_API_URL || '/api/admin'
})
http.interceptors.request.use(function (config) {
    if (localStorage.tokenZhouYC404) {
        config.headers.Authorization ='Bearer '+localStorage.tokenZhouYC404
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
http.interceptors.response.use(res=>{//拦截response的拦截器，当正常时，返回res也就是不做任何操作，当err时，显示element-ui的提示框并返回错误。
return res
},err=>{
if (err.response.data.message) {//如果err.response.data里面有message信息，也就是后端返回了错误而且这个错误携带message，就显示element-ui的提示框，内容即为message。
    Vue.prototype.$message({
        type:'error',
        message:err.response.data.message})
}
    return Promise.reject(err)
})
export default http