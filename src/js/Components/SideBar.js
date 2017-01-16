import React,{ Component } from 'react';
import { Link } from 'react-router';

class SideBar extends Component{
	render(){
		return (
			<dl className="sidebar">
				<dt>频道</dt>
				<dd><Link to="channel/1" activeStyle={{color:"#C52F30"}}>新歌榜</Link></dd>
				<dd><Link to="channel/2" activeStyle={{color:"#C52F30"}}>热歌榜</Link></dd>
				<dd><Link to="channel/11" activeStyle={{color:"#C52F30"}}>摇滚榜</Link></dd>
				<dd><Link to="channel/12" activeStyle={{color:"#C52F30"}}>爵士</Link></dd>
				<dd><Link to="channel/16" activeStyle={{color:"#C52F30"}}>流行</Link></dd>
				<dd><Link to="channel/21" activeStyle={{color:"#C52F30"}}>欧美金曲榜</Link></dd>
				<dd><Link to="channel/22" activeStyle={{color:"#C52F30"}}>经典老歌榜</Link></dd>
				<dd><Link to="channel/23" activeStyle={{color:"#C52F30"}}>情歌对唱榜</Link></dd>
				<dd><Link to="channel/24" activeStyle={{color:"#C52F30"}}>影视金曲榜</Link></dd>
				<dt>创建的歌单</dt>
				<dd><span className="m-icon m-heart"></span><Link to="locallist" activeStyle={{color:"#C52F30"}}>我喜欢的音乐</Link></dd>
			</dl>

		);
	}
}

export default SideBar;
