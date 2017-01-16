/**
 * Created by Administrator on 2017/1/13.
 */
import { UPDATEPLAYLIST,UPDATEPLAYLISTINDEX,CLEARALLPLAYLIST,SHOWPLAYLIST } from '../Constants/ActionType.js';
import { offsetLeft,trim,formatLrc,filter,getIndex } from '../util/tool.js';
import {updateLocalList} from './LocalPlayList'
export function addToPlayList(song_info,e){
    return (dispatch,getState) => {
        let songLists = getState().playListState.song_list;
        let songs = filter('song_id',song_info,songLists);
        if(songs.length===0){
            return null;
        }
        return dispatch(updatePlayList(songs,'ADD'));
    };
}

export function updatePlayList(song_list,oper){
    return {
        type: UPDATEPLAYLIST,
        operation: oper,
        items: song_list
    }
}
export function showPlayList(e){
    e.nativeEvent.stopImmediatePropagation();
    return {
        type: SHOWPLAYLIST
    }
}
export function clearAllPlayList(){
    return {
        type: CLEARALLPLAYLIST
    }
}

export function loveAllPlayList(){
    return (dispatch,getState) => {
        let addSongs = getState().playListState.song_list;
        let songLists = getState().localPlayListState.song_list;
        let songs = filter('song_id',addSongs,songLists);
        if(songs.length===0){
            return null;
        }
        return dispatch(updateLocalList(songs));
    };
}

export function updateCurPlayIndex(index){
    return {
        type: UPDATEPLAYLISTINDEX,
        curIndex: index
    }
}