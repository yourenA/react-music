/**
 * Created by Administrator on 2017/1/13.
 */
import { UPDATEPLAYLIST,UPDATEPLAYLISTINDEX,CLEARALLPLAYLIST,SHOWPLAYLIST } from '../Constants/ActionType.js';
import { StorageGetter,StorageSetter} from '../util/tool.js';
import objectAssign from 'object-assign';
const initCurPlayList = StorageGetter('curPlayList')||{
        isDisplay: false,
        length: 0,
        mode: 0,                //0-循环，1-随机，2-单曲(缺少字体)
        curIndex: -1,
        song_list: []
    };
//播放列表Reducer;curPlayList
export default function curPlayList  (preState = initCurPlayList,action){
    switch(action.type){
        case UPDATEPLAYLIST:
            if(action.operation==='REPLACE'){
                return objectAssign({},preState,{
                    length: action.items.length,
                    curIndex: 0,
                    song_list: action.items
                });
            }else if(action.operation==='ADD'){
                return objectAssign({},preState,{
                    length: preState.length+action.items.length,
                    //这里不能用preState.song_list.push.apply(,action.items).因为push操作，只修改原数组，返回length。
                    //而我们这里需要返回一个新的数组，所以用 concat
                    song_list: preState.song_list.concat(action.items)
                });
            }
        case SHOWPLAYLIST:{
            return objectAssign({},preState,{
                isDisplay: !preState.isDisplay
            });
        }
        case UPDATEPLAYLISTINDEX:
            return objectAssign({},preState,{
                curIndex: action.curIndex
            });
        case CLEARALLPLAYLIST:
            return objectAssign({},preState,{
                length: 0,
                curIndex: -1,
                song_list: []
            });
        default:
            return preState;
    }
};