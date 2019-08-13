import React, { ReactNode } from 'react';
import router from 'umi/router'
import { WingBlank } from 'antd-mobile'
import { formateNumber } from '../../util/util'
import LazyLoad from 'react-lazy-load';
import styles from './index.less'
import request from '../../util/request'
interface Recomm{ 
  alg: string,
  canDislike: boolean
  copywriter: string
  highQuality: boolean
  id: number
  name: string
  picUrl: string
  playCount: number
  trackCount: number
  type: number
}
interface MyState{ 
  recommendList: Array<Recomm>
}
export default class Index extends React.Component<object,MyState>{
  constructor(props:any){
    super(props)
    this.state = {
      recommendList: []
    }
  }
  componentDidMount(){
    request.get('personalized').then(res => {
      if (res.code === 200) {
        this.setState({
          recommendList: res.result || []
        })
      }
    })
  }
  render(): ReactNode {
    return (
      <WingBlank size="sm">
        <h4 className={styles.title}>推荐歌单</h4>
        <div className={styles.listwrap}>
          {
            this.state.recommendList.map((recomm:Recomm,index:number) => {
              return (
                <div className={styles.recomm} key={index} onClick={this.toRecommend.bind(this,recomm.id)}>
                  <LazyLoad className={styles.LazyLoad} height={120} offsetTop={10}>
                    <img className={styles.recommpic} src={recomm.picUrl} alt=""/>
                  </LazyLoad>
                  <div className={styles.playCount}>
                    <i className={`${styles.playIcon} iconfont icon-erji`}></i>
                    {formateNumber(recomm.playCount)}
                  </div>
                  <div className={styles.name}>{recomm.name}</div>
                </div>
              )
            })
          }
        </div>
      </WingBlank>
    );
  }
  toRecommend(id:number) {
    router.push('/recommend/' + id);
  }
}
