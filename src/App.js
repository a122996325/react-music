import React, { Component } from 'react';
import { InputItem, List } from 'antd-mobile'
import Player from './conponents/player/Play'
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchVal: '',
      suggList:[],
      id: ''
    }
  }
  getSearch = () => {
    this._get('/top/list',{idx: 3}).then((result) => {
      console.log(result)
    }).catch((err) => {});
  }
  changeVal = (e) => {
    this.setState({
      searchVal: e
    })
    if (!e.trim()) {
      this.setState({
        suggList: []
      })
      return
    }
    setTimeout(()=>{
      this._get('search/suggest', {keywords: e}).then(res => {
        console.log(res)
        this.setState({
          suggList: res.result.songs || []
        })
      })
    },500)
  }
  chooseSong = (item) => {
    this.setState({
      id:item
    })
  }
  render() {
    return (
      <div className="App">
        <InputItem
            value={this.state.searchVal}
            placeholder="输入你想搜索的歌曲"
            clear
            onChange={this.changeVal}
            moneyKeyboardAlign="left"
          ></InputItem>
        <List className="my-list">
          {
            this.state.suggList.map((item,index) => {
              return (
                <List.Item onClick={this.chooseSong.bind(this,item.id)} key={index}>{item.name}</List.Item>
              )
            })
          }
        </List>
        {this.state.id}
        {/* <Button onClick={this.getSearch}>获取数据</Button> */}
        <Player id={this.state.id}></Player>
      </div>
    );
  }
}

export default App;
