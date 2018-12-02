import React, { Component } from 'react'
import ReactAudioPlayer from 'react-audio-player';
import './index.scss'
export class Play extends Component {
  constructor(props) {
    super(props)
    this.state = {
       isLoop: true,
       isHeart: false,
       isPlay: false,
       lyric: [],
       lyricTxt: '',
       songName:'',
       songImg:'',
       songUrl: '',
       id: ''
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.id){
      this.setState({
        id: nextProps.id
      })
      if (this.state.id) {
        this.getLyric()
        this.getSongDetail()
        this.getUrl()
      }
    }
  }
  componentDidMount () {
    this.setState({
      isPlay: !this.rap.audioEl.paused
    })
    // this.getLyric()
    // this.getSongDetail()
    // this.getUrl()
  }
  getSongDetail = () => {
    this._get('song/detail',{ids: this.state.id}).then(res => {
      this.setState({
        songName: res.songs[0].name,
        songImg: res.songs[0].al.picUrl
      })
    })
  }
  getLyric = () => {
    this._get('lyric',{id:this.state.id}).then(res => {
      if (res.code === 200) {
        if (res.lrc && res.lrc.lyric) {
          let arr = res.lrc.lyric.replace(/\[/g,')').split(')').map((item,index)=>{
            let o ={}
            o.time = item.split(']')[0]
            o.lrc = item.split(']')[1]
            return o
          }).splice(1)
          this.setState({
            lyric: arr
          })
        } else {
          this.setState({
            lyric: [{time:'0',lrc:'本歌曲暂无歌词'}]
          })
        }
      } else {
        // 接口抛错
      }
    })
  }
  heart = () => {
    this.setState({
      isHeart: !this.state.isHeart
    })
  }
  changePlay = () => {
    if (this.rap.audioEl.paused) {
      this.rap.audioEl.play()
    } else {
      this.rap.audioEl.pause()
    }
    this.setState({
      isPlay: !this.rap.audioEl.paused
    })
  }
  listenPlay = (e) => {
    for (let index = 0; index < this.state.lyric.length; index++) {
      const val = this.state.lyric[index];
      if (Math.abs(this.timeTemp(val) - (e*1000).toFixed()) <=50) {
        console.log(val)
        this.setState({
          lyricTxt: val.lrc
        })
        return
      }
    }
  }

  getUrl = () => {
    this._get('/song/url',{id: this.state.id}).then((res) => {
      this.setState({
        songUrl: res.data[0].url
      })
    })
  }
  timeTemp (str) {
    let time = str.time.split(':')
    if (time.length === 3) {
      return (time[0]*3600 + time[1]*60 + time[2]*1)*1000
    } else if (time.length === 2) {
      return (time[0]*60 + time[1]*1)*1000
    } else {
      return 0
    }
  }
  render() {
    return (
      <div className="player">
        <ReactAudioPlayer
          src={this.state.songUrl}
          ref={(element) => { this.rap = element; }}
          listenInterval={100}
          controls={this.state.isPlay}
          loop={this.state.isLoop}
          onListen={this.listenPlay}
        />
        <div className='song-img'>
          <img src={this.state.songImg} alt=''/>
        </div>
        <div className='song-wrap'>
          <div className='song-name'>{this.state.songName}</div>
          <p className='song-lyric'>{this.state.lyricTxt}</p>
        </div>
        <div
          className={`play-btn iconfont ${this.state.isPlay ? 'icon-zanting' : 'icon-bofang'}`}
          onClick={this.changePlay}></div>
        <div className={`song-list iconfont icon-xihuan ${this.state.isHeart ? 'is-heart' : ''}`} onClick={this.heart}></div>
      </div>
    )
  }
}

export default Play