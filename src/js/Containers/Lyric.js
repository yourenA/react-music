import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import * as LyricActions from '../actions/Lyric';
import { connect } from 'react-redux';
import LyricInfo from '../Components/LyricInfo';
import LyricContent from '../Components/LyricContent';

import "../../css/lyric.scss";

class Lyric extends Component{
	componentDidMount(){
		this.props.fetchLyric(this.props.playMusicState.song_id);
	}
	render(){
		let{ playMusicState,lyricState }= this.props;
		let bg = {};
		if(playMusicState.pic_big!==''){
			bg = {
				backgroundImage: 'url("'+playMusicState.pic_big+'")'
			};
		}
		return (
			<div className="lyric">
				<div className="lyric-operation">
					<div className="lyric-outer">
						<div className="lyric-inner">
							<div className="lyric-img" style={bg}></div>
						</div>
					</div>
				</div>
				<div className="lyric-container">
					<LyricInfo {...playMusicState} />
					<LyricContent {...lyricState}/>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state){
	return {
		playMusicState:state.playMusicState,
		lyricState:state.lyricState
	};
}

function mapDispatchToProps(dispath) {
	return bindActionCreators(LyricActions, dispath);
}
export default connect(mapStateToProps,mapDispatchToProps)(Lyric);