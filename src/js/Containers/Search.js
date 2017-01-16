import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import * as queryActions from '../actions/Query';
import { connect } from 'react-redux';
import ListContent from '../Components/ListContent';
import LoadingInfo from '../Components/LoadingInfo';
import "../../css/search.scss";

class Query extends Component{
	render(){
		let {queryState} = this.props;
		console.log("queryState",queryState);
		let displaykeyword=queryState.displaykeyword;
		let length=queryState.length;
		let list=queryState.result;
		let info = queryState.isFetching ? 'Loading...' : false;
		if (info) {
			return (
				<LoadingInfo info={info}/>
			);
		}
		let durationShow = false;
		return (
			<div>
				<div className="search-header">
					搜索 <span>&quot;{displaykeyword}&quot;</span>，找到 {length} 首单曲
				</div>
				<ListContent listContent={list} durationShow={durationShow}/>
			</div>
		);
	}
}
function mapStateToProps(state){
	return {
		queryState:state.queryState
	};
}

function mapDispatchToProps(dispath){
	return bindActionCreators(queryActions,dispath);
}

export default connect(mapStateToProps,mapDispatchToProps)(Query);