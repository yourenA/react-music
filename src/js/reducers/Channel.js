/**
 * Created by Administrator on 2017/1/11.
 */
import { REQUESTCHANNELLIST,RECEIVECHANNELLIST,FAILQUERYCHANNELLIST} from '../Constants/ActionType.js';
import objectAssign from 'object-assign';
const initChannelPlayList = {
    isFetching: false,
    success: true,
}
export default function channelState(prestate = initChannelPlayList,action) {
    switch(action.type){
        case REQUESTCHANNELLIST:
            return objectAssign({},prestate,{isFetching: true,fetchingChannel: action.channel_type})
        case RECEIVECHANNELLIST:
            let state = prestate;
            state.isFetching=false;
            state.success=true;
            let postDate=action.items;
            let channel_type=action.items.channel_type;
            if(state[channel_type]){
                state.song_list.push.apply(state[channel_type].song_list,postDate.list.song_list)
            }else{
                state[channel_type] = postDate.list;
            }
            state[channel_type].length = state[channel_type].song_list.length;
            return objectAssign({},prestate,state);
        case FAILQUERYCHANNELLIST:
            if(prestate.fetchingChannel === action.channel_type){
                return objectAssign({},prestate,{
                    isFetching: action.isFetching,
                    success: action.success
                });
            }else{
                return prestate;
            }
        default:
            return prestate;
    }
}