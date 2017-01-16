/**
 * Created by Administrator on 2017/1/12.
 */
import { REQUESTCHANNELLIST,RECEIVECHANNELLIST,SHOWCHANNELLIST,FAILQUERYCHANNELLIST } from '../Constants/ActionType.js';
import { CONFIG } from '../Constants/Config.js';

import fetchJSONP from 'fetch-jsonp';


function requestChannelList(channel_type){
    return {
        isFetching: true,
        type: REQUESTCHANNELLIST,
        channel_type: channel_type
    };
}
function receiveChannelList(channel_type,json){
    var post = {
        type: RECEIVECHANNELLIST,
        channel_type: channel_type,
        list: {
            length: json.billboard.billboard_songnum,
            date: json.billboard.update_date,
            name: json.billboard.name,
            comment: json.billboard.comment,
            avator_url: json.billboard.pic_s210,
            song_list: json.song_list
        }
    }
    return {
        isFetching: false,
        type: RECEIVECHANNELLIST,
        items: post
    };
}
export function fetchChannelList(type,flag){
    return (dispatch,getState) =>{
        let offset = 0;
        console.log("getState()",getState())
        // if(getState().channelPlayList[type]&&flag){
        //     offset = getState().channelPlayList.type.length;
        // }
        // if(getState().channelPlayList[type]&&!flag){
        //     return dispatch({type: SHOWCHANNELLIST});
        // }
        dispatch(requestChannelList(type));
        let url = `${CONFIG.base_url}?method=${CONFIG.channel_method}&type=${type}&offset=${offset}`;
        return fetchJSONP(url,{
            timeout: 30000,
            jsonpCallback: "callback"
        })
            .then(response=> response.json())
            .then(json =>
                dispatch(receiveChannelList(type,json))
            ).catch(e => {
                console.log(e);
                return dispatch({
                    type: FAILQUERYCHANNELLIST,
                    channel_type: type,
                    isFetching: false,
                    success: false
                })
            })
    };
}