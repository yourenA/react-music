/**
 * Created by Administrator on 2017/1/13.
 */
import { PLAYERSTEATESHIFT,REQUESTSONG,RECEIVESONG,SONGTIMEUPDATE,VOLUMEUPDATE,CHANGEPLAYMODE } from '../Constants/ActionType.js';
import fetchJSONP from 'fetch-jsonp';
import { CONFIG } from '../Constants/Config.js';
import { offsetLeft,trim,formatLrc,filter,getIndex } from '../util/tool.js';
import {updatePlayList,updateCurPlayIndex} from './PlayList';
export function playAll(song_list){
    return (dispatch,getState) => {
        dispatch(updatePlayList(song_list,'REPLACE'));
        let curSong = song_list[0];
        return dispatch(fetchSong(curSong.song_id));
    };
}

export function playListSong(songid,nextIndex){
    return (dispatch,getState) => {
        dispatch(updateCurPlayIndex(nextIndex));
        return dispatch(fetchSong(songid));
    };
}
export function playSpecialSong(song_id,song_info){
    return (dispatch,getState) => {
        let curState = getState().playListState;
        let newIndex = curState.length;
        let songLists = getState().playListState.song_list;
        let songs = filter('song_id',song_info,songLists);
        let playListIndex = getIndex('song_id',song_info,songLists);
        if(songs.length){
            dispatch(updateCurPlayIndex(newIndex));
            dispatch(updatePlayList(songs,'ADD'));
        }else{
            dispatch(updateCurPlayIndex(playListIndex));
        }
        return dispatch(fetchSong(song_id));
    };
}
function requestSongInfo(songid){
    return {
        type: REQUESTSONG,
        isFetching: true,
        fetchSongId: songid
    }
}

function receiveSongInfo(json){
    return {
        type: RECEIVESONG,
        isFetching: false,
        fetchSongId: json.songinfo.song_id,
        item: json
    }
}
function fetchSong(songid){
    return dispatch =>{
        dispatch(requestSongInfo(songid));
        let url = `${CONFIG.base_url}?method=${CONFIG.song_method}&songid=${songid}`;
        return fetchJSONP(url,{
            timeout: 20000,
            jsonpCallback: "callback"
        })
            .then(response=> response.json())
            .then(json =>
                dispatch(receiveSongInfo(json))
            ).catch(e =>
                console.log(e)
            )
    }
}

export function changeVol(e,audio){
    let offset = e.pageX-offsetLeft(e.currentTarget);
    let volume = offset/e.currentTarget.clientWidth;
    audio.volume = volume;
    return {
        type: VOLUMEUPDATE,
        volume: volume
    }
}

export function playStateShift(audio) {
    console.log("audio",audio)
    return (dispatch,getState)=> {
        let curState = getState().playMusicState;
        if(curState.song_id===-1){
            dispatch({ type:PLAYERSTEATESHIFT,playFlag:curState.playFlag});
        }else{
            curState.playFlag ? audio.pause() : audio.play();
            dispatch({ type:PLAYERSTEATESHIFT,playFlag:!curState.playFlag});
        }
    }
}

export function changeProgress(e,audio){
    return (dispatch,getState)=> {
        let offset = e.pageX - offsetLeft(e.currentTarget);
        // console.log(audio)
        let referTime = parseInt(offset / e.currentTarget.clientWidth * getState().playMusicState.file_duration);
        console.log(referTime)
        return dispatch({
            type: SONGTIMEUPDATE,
            currentTime: referTime
        });
    }
}


export function nextSong(){
    return (dispatch,getState) => {
        let curState = getState().playListState;
        if(curState.length===0){
            return null;
        }
        let nextIndex = curState.curIndex;
        if(curState.mode===0){
            nextIndex = (curState.curIndex+1)%(curState.length);
        }else if (curState.mode===1){
            while(nextIndex===curState.curIndex&&curState.length>1){
                nextIndex = Math.floor(curState.length*Math.random());
            }
        }
        let nextSong = curState.song_list[nextIndex];
        dispatch(updateCurPlayIndex(nextIndex));
        return dispatch(fetchSong(nextSong.song_id));
    };
}

export function preSong(){
    return (dispatch,getState) => {
        let curState = getState().playListState;
        if(curState.length===0){
            return null;
        }
        let nextIndex = curState.curIndex;
        if(curState.mode===0){
            nextIndex = nextIndex-1 <0 ? (nextIndex-1+curState.length): nextIndex-1;
        }else if(curState.mode===1){
            while(nextIndex===curState.curIndex&&curState.length>1){
                nextIndex = Math.floor(curState.length*Math.random());
            }
        }
        let nextSong = curState.song_list[nextIndex];
        dispatch(updateCurPlayIndex(nextIndex));
        return dispatch(fetchSong(nextSong.song_id));
    };
}
