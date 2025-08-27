import axios from "axios"


const axiosInstance = axios.create({

    //this is mjy new url
    baseURL : "http://monkmaze-alb-1433160481.ap-south-1.elb.amazonaws.com",

    // baseURL : "http://ec2-13-245-5-146.af-south-1.compute.amazonaws.com:5000/api/v1",
    // baseURL : "http://localhost:4000/api/v1",
    withCredentials: true,
    // headers: {
    //     "Content-Type": "application/json"
    //   }
      
})

export default axiosInstance; 