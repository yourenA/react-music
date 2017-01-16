/**
 * Created by Administrator on 2017/1/13.
 */
import { REQUESTLYRIC,RECEIVELYRIC,FAILLYRIC } from '../Constants/ActionType.js';
import fetchJSONP from 'fetch-jsonp';
import { CONFIG } from '../Constants/Config.js';
import { offsetLeft,trim,formatLrc,filter,getIndex } from '../util/tool.js';
export function fetchLyric(songid){
    return (dispatch,getState) => {
        if(songid===-1){
            return null;
        }
        dispatch(requestLyric(songid));
        let url = `${CONFIG.base_url}?method=${CONFIG.lyric_method}&songid=${songid}`;
        return fetchJSONP(url,{
            timeout: 30000,
            jsonpCallback: "callback"
        })
            .then( response => response.json())
            .then( json =>
                dispatch(receiveLyric(songid,json))
            ).catch(e => {
                console.log(e);
            });
    }
}

function requestLyric(songid){
    return {
        type: REQUESTLYRIC,
        isFetchingLyric: true,
        fetchSongId: songid
    }
}

function receiveLyric(songid,json){
    return {
        type: RECEIVELYRIC,
        isFetchingLyric: false,
        fetchSongId: songid,
        lrcContent: formatLrc(json.lrcContent)
    }
}