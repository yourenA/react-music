import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import * as LocalPlayActions from '../actions/LocalPlayList';
import { connect } from 'react-redux';
import ListHeader from '../Components/ListHeader';
import ListContent from '../Components/ListContent';
import { StorageSetter } from '../util/tool.js';

import "../../css/songlist.scss";
import "../../css/icon.scss";

class LocalList extends Component{
	render(){
		let { localPlayListState } = this.props;
		console.log("localPlayListState",localPlayListState);
		let items = localPlayListState;
		let name =  null;
		let length = null;
		let date = null;
		let comment = null;
		let song_list =null;
		let bg;
		if (items){
			name =  items.name;
			length = items.song_list.length;
			date = items.date;
			comment = items.comment;
			song_list = items.song_list;
			bg = items.avator_url!==''?{backgroundImage:`url("${items.avator_url}")`}:{};
		}
		let durationShow= true;
		return (
			<div>
				<ListHeader url={bg} listName={name} listcnt={length}
							date={date} comment={comment}/>
				<ListContent listContent={song_list} durationShow={durationShow}
							 />
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		localPlayListState:state.localPlayListState
	};
}

function mapDispatchToProps(dispath){
	return bindActionCreators(LocalPlayActions,dispath);
}
export default connect(mapStateToProps,mapDispatchToProps)(LocalList);