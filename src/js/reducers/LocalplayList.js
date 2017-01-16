/**
 * Created by Administrator on 2017/1/11.
 */
import { UPDATELOCALLIST,DELETEFROMLOCALLIST } from '../Constants/ActionType.js';
import objectAssign from 'object-assign';
import { StorageGetter,StorageSetter} from '../util/tool.js';
const initLocalPlayList = StorageGetter('localPlayList')||{
        length: 0,
        date: '2017-01-01',
        name: '我喜欢的音乐',
        comment: '这是我自己收藏的音乐',
        avator_url: '',
        song_list: []
    };
export default function localPlayListState (preState = initLocalPlayList,action) {
    switch(action.type){
        case UPDATELOCALLIST:
            var nextState = objectAssign({},preState,{
                length: preState.length + action.items.length,
                song_list: preState.song_list.concat(action.items)
            });
            StorageSetter('localPlayList',nextState);
            return nextState;
        case DELETEFROMLOCALLIST:
            var preSongList = preState.song_list;
            preSongList.splice(action.index,1);
            var nextState = objectAssign({},preState,{
                length: preSongList.length,
                song_list: preSongList
            });
            StorageSetter('localPlayList',nextState);
            return nextState;
        default:
            return preState;
    }
};