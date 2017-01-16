/**
 * Created by Administrator on 2017/1/12.
 */
import { REQUESTLYRIC,RECEIVELYRIC,FAILLYRIC } from '../Constants/ActionType.js';
import objectAssign from 'object-assign';
const initLyric = {
    song_id:-1,
    isFetchingLyric: false,
    lrcContent: [['00:00','选择一首歌欣赏下']]
}
export default function lyricState(preState=initLyric,action) {
    switch(action.type){
        case REQUESTLYRIC:
            return objectAssign({},preState,{
                song_id:action.fetchSongId,
                isFetchingLyric: action.isFetchingLyric,
            });
        case RECEIVELYRIC:
            if(preState.song_id!==action.fetchSongId){
                return preState;
            }
            return objectAssign({},preState,{
                isFetchingLyric: action.isFetchingLyric,
                lrcContent: action.lrcContent
            });
        default:
            return preState;
    }
};