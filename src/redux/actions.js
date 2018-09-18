import {
  reqRegister,
  reqLogin

} from "../api"


import{
  AUTH_SUCCESS,
  ERROR_MSG
} from "./action-types";

const authSuccess=(user)=>({type:AUTH_SUCCESS,data:user})

const errorMsg=(msg)=>({type:ERROR_MSG,data:msg})


export function register({username,password,type}) {
  return dispatch=>{
    reqRegister({username,password,type}).then(respone=>{
      const result=respone.data
      if(result.code==0){
        const user=result.data
        dispatch(authSuccess(user))
      }else{
        const msg=result.msg
        dispatch(errorMsg(msg))
      }
    })
  }
}


export function login(username, password) {
  return dispatch => {
    // 发异步ajax请求注册
    reqLogin(username, password).then(response => {
      const result = response.data // {code:0/1, msg: '', data: user}
      if(result.code==0) { // 成功了
        const user = result.data
        // 分发成功的同步action
        dispatch(authSuccess(user))
      } else { // 失败
        const msg = result.msg
        // 分发失败同步action
        dispatch(errorMsg(msg))
      }
    })
  }
}