import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { timeFormat,formatText,getIndex } from '../util/tool.js';
import * as LocalPlayActions from '../actions/LocalPlayList';
import * as PlayMusicActions from '../actions/PlayMusic';
import * as PlayListActions from '../actions/PlayList';
const actions=Object.assign({},LocalPlayActions,PlayMusicActions,PlayListActions);
class Cell extends Component{
	constructor(props) {
		super(props);
		this.addToLocalList=this.addToLocalList.bind(this);
		this.playSpecialSong=this.playSpecialSong.bind(this)
		this.addToPlayList=this.addToPlayList.bind(this)
	}
	addToLocalList(){
		let addToLocalList=this.props.addToLocalList;
		let {song_list}=this.props.localPlayListState;
		let indexInLL = getIndex('song_id',this.props.info,song_list);
		addToLocalList(this.props.info,indexInLL)
	}
	playSpecialSong(){
		console.log("dblclick");
		let playSpecialSong=this.props.playSpecialSong;
		playSpecialSong(this.props.song_id,this.props.info)
	}
	addToPlayList(){
		let addToPlayList=this.props.addToPlayList;
		addToPlayList(this.props.info)
	}
	render(){
		const { file_duration,seq,title,author,album_title } = this.props;
		let duractionStyle = this.props.durationShow ? {} : { display: "none" };
		let {song_list}=this.props.localPlayListState;
		let indexInLL = getIndex('song_id',this.props.info,song_list);
		let heartColor = `${indexInLL===-1?'#cdd2d7':'#EB363F'}`;
		return (
			<tr className="cell" onDoubleClick ={this.playSpecialSong}>
				<td style={{textAlign:"right"}}>{seq}</td>
				<td>
					<span className="m-icon m-heart"   style={{color: heartColor}} onClick={this.addToLocalList}></span>
					<span className="cell-add" onClick={this.addToPlayList}>+</span>
				</td>
				<td>{formatText(title)}</td>
				<td>{formatText(author)}</td>
				<td>{formatText(album_title)}</td>
				<td style={duractionStyle}>{timeFormat(file_duration)}</td>
			</tr>
		);
	}
};


function mapStateToProps(state,props){
	return {
		localPlayListState:state.localPlayListState
	};
}

function mapDispatchToProps(dispath){
	return bindActionCreators(actions,dispath);
}

export default connect(mapStateToProps,mapDispatchToProps)(Cell);