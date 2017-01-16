import React,{ Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
class MusicInfo extends Component{
	render(){
		const { playMusicState } = this.props;
		let title=playMusicState.title
		let author=playMusicState.author
		let bg = playMusicState.pic_small!==''?{backgroundImage: 'url("'+playMusicState.pic_small+'")'}:{};
		return (
		<div className="music-info">
			<Link to="lyric" className="music-img" style={bg}>
			</Link>
			<div className="music-baseInfo">
				<h6>{title}</h6>
				<p>{author}</p>
			</div>
		</div>
		);
	}
}

function mapStateToProps(state,props){
	return {
		playMusicState:state.playMusicState
	};
}


export default connect(mapStateToProps)(MusicInfo);