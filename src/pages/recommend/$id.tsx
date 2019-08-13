import React, { ReactNode } from "react";
import request from "../../util/request";
interface MyState {
  id: string
}
export default class Recommend extends React.Component<object,MyState>{
  constructor(props: object) {
    super(props)
    this.state = {
      id: ''
    }
  }
  componentDidMount() {
    this.setState({
      id: this.props.match.params.id
    },() => {
      request.get(`playlist/detail?id=${this.state.id}`).then(res => {
        console.log(res)
      })
    })
  }
  render(): ReactNode {
    return (
      <div></div>
    )
  }
}
