import React, { Component } from 'react';
import { Button } from 'antd-mobile'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount () {
    
  }
  getTest = () => {
    this._get('/search',{keywords: '海阔天空'}).then((result) => {
      console.log(result)
    }).catch((err) => {});
  }
  render() {
    return (
      <div className="App">
          <Button onClick={this.getTest}>获取数据</Button>
      </div>
    );
  }
}

export default App;
