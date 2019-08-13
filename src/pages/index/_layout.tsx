import React, { ReactNode } from 'react'
import router from 'umi/router'
import styles from './base.less'
interface MyState {
  tabIndex: number
}
export default class IndexPage extends React.Component<object, MyState>{
  constructor(props: any) {
    super(props)
    this.state = {
      tabIndex: 0
    }
  }
  render(): ReactNode {
    return (
      <div>
        <nav className={styles.navwrap}>
          <span
            className={`${this.state.tabIndex === 0 ? styles.active : ''}`}
            onClick={this.pageTo.bind(this, '', 0)}>
              发现
          </span>
          <span
            className={`${this.state.tabIndex === 1 ? styles.active : ''}`}
            onClick={this.pageTo.bind(this, '/index/singers', 1)}>
              歌手
          </span>
          <span
            className={`${this.state.tabIndex === 2 ? styles.active : ''}`}
            onClick={this.pageTo.bind(this, '/index/rank', 2)}>
              排行榜
          </span>
        </nav>
        <div className={styles.fixednav}></div>
        {this.props.children}
      </div>
    )
  }
  pageTo(page: string,index: number) {
    router.push(page)
    this.setState({tabIndex: index})
  }
}
