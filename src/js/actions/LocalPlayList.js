/**
 * Created by Administrator on 2017/1/12.
 */
import { UPDATELOCALLIST,DELETEFROMLOCALLIST } from '../Constants/ActionType.js';

export  function updateLocalList(song_info){
    let items = (song_info instanceof Array)? song_info: [song_info];
    return {
        type: UPDATELOCALLIST,
        items: items
    }
}
function deletefromLocalList(song_info,index){
    return {
        type: DELETEFROMLOCALLIST,
        index: index
    }
}

export function addToLocalList(song_info,index){
    return (dispatch,getState) => {
        if(index!=-1){                    //存在，则删除
            return dispatch(deletefromLocalList(song_info,index));
        }
        return dispatch(updateLocalList(song_info));
    };
}