/**
 * Created by Administrator on 2017/1/11.
 */
import { combineReducers } from 'redux';
import channelState from './Channel';
import queryState from './Query';
import localPlayListState from './LocalplayList';
import playMusicState from './PlayMusic';
import playListState from './PlayList';
import lyricState from './Lyric';
export default combineReducers({
    channelState,
    queryState,
    localPlayListState,
    playMusicState,
    playListState,
    lyricState
});
