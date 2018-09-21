
import io from 'socket.io-client'


import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList
} from "../api"


import{
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST
} from "./action-types";

const authSuccess=(user)=>({type:AUTH_SUCCESS,data:user})

const errorMsg=(msg)=>({type:ERROR_MSG,data:msg})

const receiveUser = (user) => ({type: RECEIVE_USER, data: user})

export const resetUser = (msg) => ({type: RESET_USER, data: msg})

export const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})




export function register({username,password,password2,type}) {


  if(!username) {  // 此时本质是同步action
    return errorMsg('必须指定用户名')
  } else if (!password) {
    return errorMsg('必须指定密码')
  } else if (password2!==password) {
    return errorMsg('密码必须一致')
  } else if (!type) {
    return errorMsg('必须指定用户类型')
  }

  return async dispatch=>{

    const response=await reqRegister({username,password,type})
    const result=response.data
    if(result.code==0){
      const user=result.data

      dispatch(authSuccess(user))
    }else{
      const msg=result.msg
      dispatch(errorMsg(msg))
    }
  }
}


export function login(username, password) {
  return async dispatch => {

    if(!username) {  // 必须分发一个同步action对象
      return dispatch(errorMsg('必须指定用户名'))  // 此时 return代表结束
    } else if (!password) {
      return dispatch(errorMsg('必须指定密码'))
    }

    const response=await reqLogin(username, password)
    const result=response.data
    // 发异步ajax请求注册

      if (result.code == 0) { // 成功了
        const user = result.data
        // 分发成功的同步action
        dispatch(authSuccess(user))
      } else { // 失败
        const msg = result.msg
        // 分发失败同步action
        dispatch(errorMsg(msg))
      }
  }
}

export function updateUser(user) {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data
    if(result.code===0) { // 更新用户成功
      const user = result.data
      dispatch(receiveUser(user))
    } else { // 更新失败
      const msg = result.msg
      dispatch(resetUser(msg))
    }
  }
}


export function getUser() {
  return async dispatch => {
    // 发ajax请求, 获取user
    const response = await reqUser()
    const result = response.data
    // 分发同步action
    if(result.code===0) {// 成功得到user
      dispatch(receiveUser(result.data))
    } else { // 失败
      dispatch(resetUser(result.msg))
    }
  }
}



export function getUserList(type) {
  return async dispatch => {
    const response = await reqUserList(type)
    const result = response.data
    if(result.code===0) {
      const userList = result.data
      dispatch(receiveUserList(userList))
    }
  }
}


// 连接服务器, 得到代表连接的socket对象
const socket = io('ws://localhost:4000')
// 绑定监听, 接收服务发送的消息
socket.on('receiveMsg', (chatMsg) => {
  console.log('浏览器接收到服务器返回的消息', chatMsg)
})

/*
发送聊天消息的异步action
 */
export function sendMsg ({content, from, to}) {
  return dispatch => {
    // 发消息
    socket.emit('sendMsg', {content, from, to})
    console.log('浏览器向服务器发消息', {content, from, to})
  }
}
