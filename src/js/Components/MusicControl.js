import React,{ Component } from 'react';
import { timeFormat} from '../util/tool.js';
import { bindActionCreators } from 'redux';
import * as PlayListActions from '../actions/PlayList';
import * as PlayMusicActions from '../actions/PlayMusic';
const actions=Object.assign({},PlayListActions,PlayMusicActions)
import { connect } from 'react-redux';
class MusicControl extends Component{
	constructor(props){
		super(props);
		this.playShift = this.playShift.bind(this);
		this.changeVol = this.changeVol.bind(this);
		this.changeProgress = this.changeProgress.bind(this);
	}
	playShift(){
		this.props.playStateShift(this.refs.audio);
	}
	changeVol(e){
		this.props.changeVol(e,this.refs.audio);
	}
	changeProgress(e){
		this.props.changeProgress(e,this.refs.audio);
	}
	componentDidMount(){
		this.refs.audio.volume = this.props.playMusicState.volume;
	}
	componentDidUpdate(preprops){
		if(this.props.src!==''&&this.props.src!==preprops.src){
			this.props.playStateShift(this.refs.audio);
		}
	}
	render(){
		let {playMusicState,playListState,nextSong,preSong,showPlayList,songTimeUpdate,changeMode } = this.props;
		let src=playMusicState.song_url;
		let playMode=`${playListState.mode == 1 ? 'm-radom':'m-xunhuan'}`;
		let curTime= timeFormat(playMusicState.currentTime);
		let	totalTime=timeFormat(playMusicState.file_duration);
		let	volume=playMusicState.volume*100;
		let	timeWidth=`${playMusicState.currentTime*100/playMusicState.file_duration}%`;
		let play=`${playMusicState.playFlag ?'m-pause':'m-play'}`;
		let length=playListState.length;
		return(
			<div className="music-box">
				<audio ref="audio" src={src} onEnded={nextSong} onTimeUpdate={songTimeUpdate}></audio>
				<div className="music-control">
					<span className="m-icon m-prev music-prev" onClick={preSong}></span>
					<span className={`m-icon music-play ${play}`} onClick={this.playShift}></span>
					<span className="m-icon m-next music-next" onClick={nextSong}></span>
				</div>
				<span className="music-curTime">{curTime}</span>
				<span className="music-totalTime">{totalTime}</span>
				<div className="music-volume">
					<span className="icon-volume"></span>
					<div className="music-volumeBar" onClick={this.changeVol}>
						<div className="music-curVolume" style={{width:`${volume}%`}}>
						</div>
					</div>
				</div>
				<div className="music-playMode" onClick={changeMode}>
					<span className={`m-icon ${playMode}`}></span>
				</div>
				<div className="music-listicon" onClick={(e)=>showPlayList(e)}>
					<div className="music-listcnt">{length}</div>
				</div>
				<div className="music-timeline">
					<div className="music-lineContainer" onClick={this.changeProgress}>
						<div className="music-playhead" style={{width:timeWidth}}></div>
					</div>
				</div>
			</div>
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

export default connect(mapStateToProps,mapDispatchToProps)(MusicControl);