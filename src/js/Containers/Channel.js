import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as ItemsActions from '../actions/Channel';
import * as LocalPlayListActions from '../actions/LocalPlayList';
import * as PlayMusicActions from '../actions/PlayMusic';
import {connect} from 'react-redux';
import ListHeader from '../Components/ListHeader';
import ListContent from '../Components/ListContent';
import LoadingInfo from '../Components/LoadingInfo';
const action =Object.assign({},ItemsActions,LocalPlayListActions,PlayMusicActions);
class Channel extends Component {
    constructor(props) {
        super(props);
        this.playAll = this.playAll.bind(this);
    }

    componentDidMount() {
        this.props.fetchChannelList(this.props.params.id, false);
    }
    componentWillReceiveProps(nextprops){
        if(nextprops.params.id!=this.props.params.id){
            this.props.fetchChannelList(nextprops.params.id,false);
        }
    }
    playAll(){
        let {channelState} = this.props;
        let items = channelState[this.props.params.id];
        let song_list = items.song_list;
        this.props.playAll(song_list);
    }
    render() {
        let {channelState} = this.props;
        let info = channelState.isFetching ? 'Loading...' : false;
        let items = channelState[this.props.params.id];
        let name =  null;
        let length = null;
        let date = null;
        let comment = null;
        let song_list =null;
        let bg;
        if (items){
            name =  items.name;
            length = items.length;
            date = items.date;
            comment = items.comment;
            song_list = items.song_list;
            bg = items.avator_url!==''?{backgroundImage:`url("${items.avator_url}")`}:{};
        }

        if (info) {
            return (
                <LoadingInfo info={info}/>
            );
        }
        let durationShow = true;
        return (
            <div>
                <ListHeader url={bg}  listName={name} listcnt={length} date={date} comment={comment}
                playAll={this.playAll}/>
                <ListContent listContent={song_list} durationShow={durationShow} playSpecialSong={this.props.playSpecialSong}
                addToPlayList={this.props.addToPlayList} addToLocalList={this.props.addToLocalList}/>
            </div>
        );
    }
}

function mapDispatchToProps(dispath) {
    return bindActionCreators(action, dispath);
}
export default connect( mapDispatchToProps)(Channel) ;