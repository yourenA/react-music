import React,{ Component } from 'react';
import { connect } from 'react-redux';
import PlayListline from '../Components/PlayListline';
import './../../css/curplaylist.scss'
import * as PlayListActions from '../actions/PlayList';
import { bindActionCreators } from 'redux';
class PlayListPanel extends Component{
	constructor(props) {
		super(props);
		this.stopClickDefault=this.stopClickDefault.bind(this)
	}
	componentDidMount(){
		const that =this
		document.onclick = function (e) {
			that.refs.playlist.style.display='none'
		};
	}
	stopClickDefault(e){
		e.nativeEvent.stopImmediatePropagation();
	}
	render(){
		const { playListState,clearAllPlayList,loveAllPlayList } = this.props;
		let trs =playListState.song_list.map((item,index) =>
				<PlayListline {...item} seq={index} key={index} />
			);
		let length=playListState.length;
		let isDisplay=playListState.isDisplay;
		return (
			<div onClick={this.stopClickDefault} ref="playlist" className="playlist" style={{display:`${isDisplay?'block':'none'}`}}>
				<div className="playlist-type">播放列表</div>
				<div className="playlist-info">
					<span className="playlist-cnt">总{length}首</span>
					<span className="playlist-clearall" onClick={clearAllPlayList}>清空</span>
					<span className="playlist-separator">|</span>
					<span className="playlist-loveall" onClick={loveAllPlayList} >收藏全部</span>
				</div>
				<div className="playlist-content">
					<table>
						<tbody>
							{trs}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state,props){
	return {
		playListState:state.playListState
	};
}

function mapDispatchToProps(dispath){
	return bindActionCreators(PlayListActions,dispath);
}

export default connect(mapStateToProps,mapDispatchToProps)(PlayListPanel);