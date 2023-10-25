import axios from "axios";

export const commonAPI = async(method,url,data)=>{
    let reqConfig ={
        method,url,data,headers:{
            'Content-Type':'application/json'
        }
    }
    return await axios(reqConfig).then(
        (result)=>{
            return result
        }
    ).catch((err)=>{
        return err
    })
}