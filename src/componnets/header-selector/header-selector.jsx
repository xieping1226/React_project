import React, {Component} from 'react'
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component{
  static  propTypes={
    setHeader:PropTypes.func.isRequired
  }

  state={
    icon:null
  }

  selectHeader=({icon,text})=>{
    this.setState({
      icon
    })
    this.props.setHeader(text)
  }
  render(){
    const headerList=[]
    for (var i = 0; i < 20; i++) {
      headerList.push({
        icon:require('../../assets/images/头像'+(i+1)+'.png'),
        text:'头像'+(i+1)
      })
    }

    const{icon}=this.state
    const headerUI = icon ? <div><span>已选择头像</span><img src={icon}/></div> : '请选择头像'

    return(
      <List renderHeader={() => headerUI}>
        <Grid data={headerList}
              columnNum={5}
              onClick={this.selectHeader}></Grid>
      </List>
    )
  }
}