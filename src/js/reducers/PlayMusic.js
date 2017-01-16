/**
 * Created by Administrator on 2017/1/13.
 */
import { PLAYERSTEATESHIFT,REQUESTSONG,RECEIVESONG,SONGTIMEUPDATE,VOLUMEUPDATE,CHANGEPLAYMODE } from '../Constants/ActionType.js';
import { StorageGetter} from '../util/tool.js';
import objectAssign from 'object-assign';
const initMusicState=StorageGetter('musicState')||{
        playFlag: false,
        volume: 0.3,
        isFetching: false,
        currentTime: 0,
        song_id: -1,
        title: "",
        author: "",
        album_title: "",
        file_duration: 0,
        pic_small: "",
        pic_big: "",
        song_url: "",
        isFetchingLyric: false,
        lrcContent: [['00:00','选择一首歌欣赏下']] ,
    };
export default function musicState  (preState = initMusicState,action) {
    switch(action.type){
        case REQUESTSONG:
            return objectAssign({},preState,{
                playFlag: false,
                isFetching: action.isFetching,
                song_id: action.fetchSongId
            });
        case RECEIVESONG:
            if(preState.song_id!==action.fetchSongId){
                return preState;
            }
            return objectAssign({},preState,{
                playFlag: true,
                isFetching: action.isFetching,
                song_id: action.fetchSongId,
                currentTime: 0,
                title: action.item.songinfo.title,
                author: action.item.songinfo.author,
                album_title: action.item.songinfo.album_title,
                file_duration: action.item.bitrate.file_duration,
                pic_small: action.item.songinfo.pic_small,
                pic_big: action.item.songinfo.pic_big,
                song_url: action.item.bitrate.show_link,
                lrclink: action.item.songinfo.lrclink,
            });
        case VOLUMEUPDATE:
            return objectAssign({},preState,{
                volume: action.volume
            });
        case PLAYERSTEATESHIFT:
            return objectAssign({},preState,{
                playFlag: action.playFlag
            });
        case SONGTIMEUPDATE:
            return objectAssign({},preState,{
                currentTime: action.currentTime
            });
        default:
            return preState;
    }
};