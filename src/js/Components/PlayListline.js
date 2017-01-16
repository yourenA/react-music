import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { timeFormat,formatText } from '../util/tool.js';
import { bindActionCreators } from 'redux';
import * as PlayListActions from '../actions/PlayList';
import * as PlayMusicActions from '../actions/PlayMusic';
const actions=Object.assign({},PlayListActions,PlayMusicActions);
class Listline extends Component{
	constructor(props) {
		super(props);
		this.playListSong=this.playListSong.bind(this)
	}
	playListSong(){
		let playListSong=this.props.playListSong
		playListSong(this.props.song_id,this.props.seq)
	}
	render(){
		let { title,author,file_duration,seq,playListState} = this.props;
		let curIndex=playListState.curIndex;
		let activeStyle = curIndex===seq?{color:'red'}:{};
		return (
			<tr className="cell" style={activeStyle} onDoubleClick ={this.playListSong}>
				<td>
					<span ></span>
					{formatText(title)}
				</td>
				<td>{formatText(author)}</td>
				<td>{timeFormat(file_duration)}</td>
			</tr>
		);
	}
}



function mapStateToProps(state,props){
	return {
		playMusicState:state.playMusicState,
		playListState:state.playListState
	};
}

function mapDispatchToProps(dispath){
	return bindActionCreators(actions,dispath);
}

export default connect(mapStateToProps,mapDispatchToProps)(Listline);