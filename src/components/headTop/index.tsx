import React, { ReactNode } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import router from 'umi/router';
import styles from './index.less';
export default class HeadTop extends React.Component<object>{
  constructor(props:any) {
    super(props);
    this.searchHandler = this.searchHandler.bind(this)
  }
  render(): ReactNode {
    return (
      <div className={styles.head}>
        <NavBar
          className={styles.navbar}
          mode="light"
          icon={<i className={`${styles.menu} iconfont icon-caidan`}></i>}
          onLeftClick={() => alert('开发中')}
          rightContent={[
          <Icon
            key="0"
            type="search"
            onClick={this.searchHandler}
            style={{ marginRight: '16px' }} />,
        ]}/>
        <div className={styles.fixedbox}></div>
      </div>
    )
  }
  searchHandler() {
    router.push('/search')
  }
}
