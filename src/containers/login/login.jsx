import React, {Component} from 'react'
import {NavBar, WingBlank, List, WhiteSpace, InputItem, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from '../../redux/actions'
import Logo from '../../componnets/logo/logo'



class Login extends Component {
  state = {
    username: '',
    password: '',
  }


  handleChange = (name, value) => {
    this.setState({[name]: value})
  }


  goRegister = () => {
    this.props.history.replace('/register')
  }

  login = () => {
    // console.log(this.state)
    const {username,password}=this.state
    this.props.login(username,password)
  }


  render() {
    const {redirectTo,msg}=this.props.user
    if(redirectTo){
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar>硅谷直聘</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            {msg ? <p className='error-msg'>{msg}</p> : null}
            <InputItem
              placeholder='输入用户名'
              onChange={val => this.handleChange('username', val)}
            >
              用户名:
            </InputItem>
            <WhiteSpace/>
            <InputItem
              type='password'
              placeholder='输入密码'
              onChange={val => this.handleChange('password', val)}
            >
              密&nbsp;&nbsp;&nbsp;码:
            </InputItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;陆</Button>
            <WhiteSpace/>
            <Button onClick={this.goRegister}>还没有账号</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {login}
)(Login)